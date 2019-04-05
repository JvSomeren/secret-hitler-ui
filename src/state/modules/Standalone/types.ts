export enum GameStatus {
  STOPPED,
  INITIALIZING, // start of game
  SHOWING_ROLES,
  PRE_GAME,
  CHOOSING_INITIAL_PRESIDENT,
  NOMINATING_CHANCELLOR, // start of round
  VOTING_ON_GOVERNMENT,
  PRESIDENT_DISCARDING_POLICY,
  CHANCELLOR_DISCARDING_POLICY,
  EXECUTIVE_ACTION, // end of round
  INVESTIGATING_LOYALTY, // presidential powers
  CALLING_SPECIAL_ELECTION,
  POLICY_PEEKING,
  EXECUTING,
  CALLING_VETO,
  GAME_END, // end of game
}

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

export enum Policy {
  Liberal,
  Fascist,
}

export interface Card {
  id: number;
  policy: Policy;
}

export interface Game {
  drawPile: Card[]; // default: empty array
  discardPile: Card[]; // default: empty array
  liberalPolicies: number; // default: 0
  fascistPolicies: number; // default: 0
  president: Player | null; // default: null
  chancellor: Player | null; // default: null
  failedElections: number; // default: 0
}

export interface StandaloneState {
  status: GameStatus;
  view: string;
  game: Game;
  playerCount: number;
  players: Player[];
}

export const liberalFascistDistribution: {
  [index: number]: {[index: number]: number}} = {
  5: {
    [SecretRole.Liberal]: 3,
    [SecretRole.Fascist]: 1,
    [SecretRole.Hitler]: 1,
  },
  6: {
    [SecretRole.Liberal]: 4,
    [SecretRole.Fascist]: 1,
    [SecretRole.Hitler]: 1,
  },
  7: {
    [SecretRole.Liberal]: 4,
    [SecretRole.Fascist]: 2,
    [SecretRole.Hitler]: 1,
  },
  8: {
    [SecretRole.Liberal]: 5,
    [SecretRole.Fascist]: 2,
    [SecretRole.Hitler]: 1,
  },
  9: {
    [SecretRole.Liberal]: 5,
    [SecretRole.Fascist]: 3,
    [SecretRole.Hitler]: 1,
  },
  10: {
    [SecretRole.Liberal]: 6,
    [SecretRole.Fascist]: 3,
    [SecretRole.Hitler]: 1,
  },
};
