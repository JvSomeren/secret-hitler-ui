export enum PartyMembership {
  Liberal,
  Fascist,
}

export enum SecretRole {
  Liberal,
  Fascist,
  Hitler,
}

export interface Role {
  secretRole: SecretRole;
  partyMembership: PartyMembership;
}

export interface Player {
  id: number;
  name: string; // default: Player ${id}
  role: Role | null; // default: null
  president: boolean; // default: false
  chancellor: boolean; // default: false
  dead: boolean; // default: false
}

export interface StandaloneState {
  status: string;
  playerCount: number;
  players: Player[];
}
