import {Game, GameStatus, Player} from '@/state/modules/Standalone/types';

export interface OnlineState {
  status: GameStatus;
  view: string;
  game: Game;
  playerCount: number;
  players: Player[];
}
