import {Game, Player} from '@/state/modules/Standalone/types';

export enum OnlineEvents {
  UPDATE_VIEW = 'UPDATE_VIEW',
  UPDATE_PLAYER_NAME = 'UPDATE_PLAYER_NAME',
  UPDATE_USER_ROLE = 'UPDATE_USER_ROLE',
  UPDATE_PLAYERS = 'UPDATE_PLAYERS',
  UPDATE_PLAYER_ROLE = 'UPDATE_PLAYER_ROLE',
}

export enum GameStatus {
  STOPPED = 'STOPPED',
  LOBBY = 'LOBBY',
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

export interface OnlinePlayer extends Player {
  peer: string| null;
  isHost: boolean;
  send: (data: any) => void;
}

export interface User {
  name: string;
  peerId: string | null;
  isHost: boolean;
  player: OnlinePlayer | null;
}

export interface OnlineState {
  status: GameStatus;
  view: string;
  game: Game;
  playerCount: number;
  players: OnlinePlayer[];
  user: User;
  lobbyId: string;
}
