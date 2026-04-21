-- =========================
-- TEAM FOLLOWERS
-- =========================
CREATE TABLE public.team_followers (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  team_id uuid NOT NULL REFERENCES public.teams(id) ON DELETE CASCADE,
  user_id uuid NOT NULL,
  created_at timestamptz NOT NULL DEFAULT now(),
  UNIQUE (team_id, user_id)
);

CREATE INDEX idx_team_followers_team ON public.team_followers(team_id);
CREATE INDEX idx_team_followers_user ON public.team_followers(user_id);

ALTER TABLE public.team_followers ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Followers are viewable by everyone"
  ON public.team_followers FOR SELECT
  USING (true);

CREATE POLICY "Users can follow teams as themselves"
  ON public.team_followers FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can unfollow as themselves"
  ON public.team_followers FOR DELETE
  USING (auth.uid() = user_id);

-- =========================
-- TEAM MESSAGES (public team wall)
-- =========================
CREATE TABLE public.team_messages (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  team_id uuid NOT NULL REFERENCES public.teams(id) ON DELETE CASCADE,
  author_id uuid NOT NULL,
  content text NOT NULL CHECK (char_length(content) > 0 AND char_length(content) <= 2000),
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

CREATE INDEX idx_team_messages_team ON public.team_messages(team_id, created_at DESC);

ALTER TABLE public.team_messages ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Team messages are viewable by everyone"
  ON public.team_messages FOR SELECT
  USING (true);

CREATE POLICY "Authenticated users can post team messages"
  ON public.team_messages FOR INSERT
  WITH CHECK (auth.uid() = author_id);

CREATE POLICY "Authors can update their team messages"
  ON public.team_messages FOR UPDATE
  USING (auth.uid() = author_id);

CREATE POLICY "Authors can delete their team messages"
  ON public.team_messages FOR DELETE
  USING (auth.uid() = author_id);

CREATE TRIGGER trg_team_messages_updated_at
  BEFORE UPDATE ON public.team_messages
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

-- =========================
-- DIRECT MESSAGES (1-on-1)
-- =========================
CREATE TABLE public.direct_messages (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  sender_id uuid NOT NULL,
  recipient_id uuid NOT NULL,
  content text NOT NULL CHECK (char_length(content) > 0 AND char_length(content) <= 2000),
  read_at timestamptz,
  created_at timestamptz NOT NULL DEFAULT now(),
  CHECK (sender_id <> recipient_id)
);

CREATE INDEX idx_direct_messages_recipient ON public.direct_messages(recipient_id, created_at DESC);
CREATE INDEX idx_direct_messages_sender ON public.direct_messages(sender_id, created_at DESC);
CREATE INDEX idx_direct_messages_pair
  ON public.direct_messages(LEAST(sender_id, recipient_id), GREATEST(sender_id, recipient_id), created_at DESC);

ALTER TABLE public.direct_messages ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view DMs they sent or received"
  ON public.direct_messages FOR SELECT
  USING (auth.uid() = sender_id OR auth.uid() = recipient_id);

CREATE POLICY "Users can send DMs as themselves"
  ON public.direct_messages FOR INSERT
  WITH CHECK (auth.uid() = sender_id);

CREATE POLICY "Recipients can mark DMs as read"
  ON public.direct_messages FOR UPDATE
  USING (auth.uid() = recipient_id);

CREATE POLICY "Senders can delete their DMs"
  ON public.direct_messages FOR DELETE
  USING (auth.uid() = sender_id);

-- =========================
-- REALTIME
-- =========================
ALTER PUBLICATION supabase_realtime ADD TABLE public.team_followers;
ALTER PUBLICATION supabase_realtime ADD TABLE public.team_messages;
ALTER PUBLICATION supabase_realtime ADD TABLE public.direct_messages;

ALTER TABLE public.team_followers REPLICA IDENTITY FULL;
ALTER TABLE public.team_messages REPLICA IDENTITY FULL;
ALTER TABLE public.direct_messages REPLICA IDENTITY FULL;