// Edge function: generates an AI reply as a demo team's "owner" and inserts
// it into direct_messages (DM auto-reply) or team_messages (team wall auto-reply).
// Uses the service role key to bypass the sender RLS check, since the synthetic
// owner is not a real auth.users row.

import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.45.0';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers':
    'authorization, x-client-info, apikey, content-type',
};

interface RequestBody {
  mode: 'dm' | 'team' | 'ensure';
  demoTeamId: string;
  demoTeamName: string;
  demoTeamGame: string;
  demoOwnerName: string;
  ownerUuid: string; // synthetic owner uuid (sender_id for DM / author_id for wall)
  teamUuid?: string; // for team wall mode + ensure
  recipientUuid?: string; // for DM mode (the real user)
  userMessage?: string;
  userName?: string;
}

// Ensure a synthetic profile row exists for the demo team owner, and a teams row
// exists for the demo team — required so FK constraints on team_followers and
// team_messages succeed, and so the chat UI can show the owner's username.
async function ensureDemoTeamExists(
  admin: ReturnType<typeof createClient>,
  ownerUuid: string,
  teamUuid: string,
  ownerName: string,
  teamName: string,
  primaryGame: string,
  logo: string | null = null
) {
  await admin
    .from('profiles')
    .upsert(
      { id: ownerUuid, username: ownerName, full_name: `${ownerName} (Team Owner)` },
      { onConflict: 'id' }
    );
  await admin
    .from('teams')
    .upsert(
      {
        id: teamUuid,
        name: teamName,
        owner_id: ownerUuid,
        primary_game: primaryGame,
        logo,
      },
      { onConflict: 'id' }
    );
}

Deno.serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const body = (await req.json()) as RequestBody;
    const {
      mode,
      demoTeamName,
      demoTeamGame,
      demoOwnerName,
      ownerUuid,
      teamUuid,
      recipientUuid,
      userMessage,
      userName,
    } = body;

    const SUPABASE_URL = Deno.env.get('SUPABASE_URL');
    const SUPABASE_SERVICE_ROLE_KEY = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY');
    const LOVABLE_API_KEY = Deno.env.get('LOVABLE_API_KEY');

    if (!SUPABASE_URL || !SUPABASE_SERVICE_ROLE_KEY) {
      throw new Error('Missing Supabase configuration');
    }

    const admin = createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY, {
      auth: { persistSession: false },
    });

    if (!teamUuid) throw new Error('teamUuid is required');
    await ensureDemoTeamExists(
      admin,
      ownerUuid,
      teamUuid,
      demoOwnerName,
      demoTeamName,
      demoTeamGame
    );

    if (mode === 'ensure') {
      return new Response(JSON.stringify({ ok: true }), {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    if (!LOVABLE_API_KEY) throw new Error('LOVABLE_API_KEY not configured');
    if (!userMessage) throw new Error('userMessage is required for reply modes');

    const systemPrompt = `You are ${demoOwnerName}, the owner and captain of the eSports team "${demoTeamName}" which competes in ${demoTeamGame}. You are friendly, confident, and passionate about competitive gaming. Reply directly to the fan or player who messaged you. Keep replies concise (1-3 sentences), in-character, and relevant to the message they sent. Mention your team or game when natural. Never break character or mention you are an AI.`;

    const userPrompt = `${userName ? `${userName} says: ` : ''}"${userMessage}"`;

    const aiResp = await fetch('https://ai.gateway.lovable.dev/v1/chat/completions', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${LOVABLE_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'google/gemini-3-flash-preview',
        messages: [
          { role: 'system', content: systemPrompt },
          { role: 'user', content: userPrompt },
        ],
      }),
    });

    if (!aiResp.ok) {
      if (aiResp.status === 429) {
        return new Response(
          JSON.stringify({ error: 'Rate limit exceeded. Try again shortly.' }),
          { status: 429, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
        );
      }
      if (aiResp.status === 402) {
        return new Response(
          JSON.stringify({ error: 'AI credits exhausted. Add credits to continue.' }),
          { status: 402, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
        );
      }
      const t = await aiResp.text();
      console.error('AI gateway error', aiResp.status, t);
      throw new Error(`AI gateway error: ${aiResp.status}`);
    }

    const aiJson = await aiResp.json();
    const reply: string =
      aiJson.choices?.[0]?.message?.content?.trim() ||
      `Thanks for reaching out! — ${demoOwnerName} of ${demoTeamName}`;

    if (mode === 'dm') {
      if (!recipientUuid) throw new Error('recipientUuid required for dm mode');
      const { error } = await admin.from('direct_messages').insert({
        sender_id: ownerUuid,
        recipient_id: recipientUuid,
        content: reply,
      });
      if (error) throw error;
    } else if (mode === 'team') {
      const { error } = await admin.from('team_messages').insert({
        team_id: teamUuid,
        author_id: ownerUuid,
        content: reply,
      });
      if (error) throw error;
    } else {
      throw new Error('Invalid mode');
    }

    return new Response(JSON.stringify({ reply }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  } catch (e) {
    console.error('demo-team-reply error:', e);
    return new Response(
      JSON.stringify({ error: e instanceof Error ? e.message : 'Unknown error' }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }
});
