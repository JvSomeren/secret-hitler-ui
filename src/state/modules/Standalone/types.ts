export enum GameStatus {
  STOPPED = 'STOPPED',
  INITIALIZING = 'INITIALIZING', // start of game
  SHOWING_ROLES = 'SHOWING_ROLES',
  PRE_GAME = 'PRE_GAME',
  CHOOSING_INITIAL_PRESIDENT = 'CHOOSING_INITIAL_PRESIDENT',
  NOMINATING_CHANCELLOR = 'NOMINATING_CHANCELLOR', // start of round
  VOTING_ON_GOVERNMENT = 'VOTING_ON_GOVERNMENT',
  PRESIDENT_DISCARDING_POLICY = 'PRESIDENT_DISCARDING_POLICY',
  CHANCELLOR_DISCARDING_POLICY = 'CHANCELLOR_DISCARDING_POLICY',
  EXECUTIVE_ACTION = 'EXECUTIVE_ACTION', // end of round
  ENACT_TOP_POLICY = 'ENACT_TOP_POLICY', // 3 failed elections in a row
  INVESTIGATING_LOYALTY = 'INVESTIGATING_LOYALTY', // presidential powers
  CALLING_SPECIAL_ELECTION = 'CALLING_SPECIAL_ELECTION',
  POLICY_PEEKING = 'POLICY_PEEKING',
  EXECUTING = 'EXECUTING',
  CALLING_VETO = 'CALLING_VETO',
  GAME_END = 'GAME_END', // end of game
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

export interface Government {
  president: Player | null; // default: null
  chancellor: Player | null; // default: null
}

export interface Game {
  drawPile: Card[]; // default: empty array
  discardPile: Card[]; // default: empty array
  drawnPolicies: Card[]; // default; empty array
  liberalPolicies: Card[]; // default: 0
  fascistPolicies: Card[]; // default: 0
  president: Player | null; // default: null
  chancellor: Player | null; // default: null
  lastGovernment: Government; // default: null Government
  failedElections: number; // default: 0
  nextPresident: Player | null; // default: null
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
