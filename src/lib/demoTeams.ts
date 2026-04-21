// Maps hardcoded demo team string IDs (e.g. "1", "3") to deterministic UUIDs
// so that follow + chat features (which require UUIDs in Supabase) work for them.
// Uses a fixed namespace + UUIDv5-style derivation via SHA-1.

const NAMESPACE = 'a1b2c3d4-e5f6-4789-abcd-ef0123456789';

const sha1 = async (input: string): Promise<Uint8Array> => {
  const buf = new TextEncoder().encode(input);
  const hash = await crypto.subtle.digest('SHA-1', buf);
  return new Uint8Array(hash);
};

const bytesToUuid = (bytes: Uint8Array): string => {
  // Set version 5 + RFC 4122 variant
  bytes[6] = (bytes[6] & 0x0f) | 0x50;
  bytes[8] = (bytes[8] & 0x3f) | 0x80;
  const hex = Array.from(bytes.slice(0, 16))
    .map((b) => b.toString(16).padStart(2, '0'))
    .join('');
  return `${hex.slice(0, 8)}-${hex.slice(8, 12)}-${hex.slice(12, 16)}-${hex.slice(16, 20)}-${hex.slice(20, 32)}`;
};

const cache = new Map<string, string>();

export const demoIdToUuid = async (kind: 'team' | 'owner', rawId: string): Promise<string> => {
  const key = `${kind}:${rawId}`;
  if (cache.has(key)) return cache.get(key)!;
  const bytes = await sha1(`${NAMESPACE}:${key}`);
  const uuid = bytesToUuid(bytes);
  cache.set(key, uuid);
  return uuid;
};

// Demo team metadata used by the AI reply persona on the server
export interface DemoTeamInfo {
  id: string;
  name: string;
  primaryGame: string;
  ownerName: string;
}

export const DEMO_TEAMS: Record<string, Omit<DemoTeamInfo, 'id'>> = {
  '1': { name: 'Neon Vipers', primaryGame: 'Valorant', ownerName: 'ViperKing' },
  '2': { name: 'Phantom Forces', primaryGame: 'Counter-Strike 2', ownerName: 'GhostLeader' },
  '3': { name: 'Cyber Dragons', primaryGame: 'League of Legends', ownerName: 'DragonMid' },
  '4': { name: 'Digital Titans', primaryGame: 'Dota 2', ownerName: 'TitanCore' },
  '5': { name: 'Shadow Wolves', primaryGame: 'Valorant', ownerName: 'AlphaWolf' },
  '6': { name: 'Nova Raptors', primaryGame: 'Overwatch 2', ownerName: 'NovaTank' },
  '7': { name: 'Thunder Warriors', primaryGame: 'Fortnite', ownerName: 'ThunderClap' },
  '8': { name: 'Inferno Squad', primaryGame: 'Counter-Strike 2', ownerName: 'BlazeAWP' },
  '9': { name: 'Eclipse Esports', primaryGame: 'League of Legends', ownerName: 'EclipseJungle' },
  '10': { name: 'Phoenix Flames', primaryGame: 'Rocket League', ownerName: 'FlameAerial' },
  '11': { name: 'Quantum Raiders', primaryGame: 'Rainbow Six Siege', ownerName: 'QuantumOp' },
  '12': { name: 'Stealth Vipers', primaryGame: 'Call of Duty: Modern Warfare', ownerName: 'StealthSMG' },
};

export const isDemoTeam = (rawId: string | undefined | null): boolean =>
  !!rawId && rawId in DEMO_TEAMS;

export const getDemoTeam = (rawId: string): DemoTeamInfo | null => {
  const info = DEMO_TEAMS[rawId];
  if (!info) return null;
  return { id: rawId, ...info };
};
