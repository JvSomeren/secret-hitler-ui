import {GetterTree} from 'vuex';
import {Card, GameEndResult, GameInfo, GameStatus, Government, Player, StandaloneState} from './types';
import {RootState} from '../../types';
import {getField} from 'vuex-map-fields';
import {standaloneMutations} from '@/state/modules/Standalone/mutations';

export const getters: GetterTree<StandaloneState, RootState> = {
  getField,

  gameState(state): object {
    const { playerCount, status, view } = state;

    return {
      playerCount,
      status,
      view,
    };
  },

  gameStatus(state): string {
    const { status } = state;

    switch (status) {
      case GameStatus.CHOOSING_INITIAL_PRESIDENT:
        return 'Initial president';
      case GameStatus.NOMINATING_CHANCELLOR:
        return 'Nominating chancellor';
      case GameStatus.VOTING_ON_GOVERNMENT:
        return 'Election';
      case GameStatus.PRESIDENT_DISCARDING_POLICY:
        return 'President discards';
      case GameStatus.CHANCELLOR_DISCARDING_POLICY:
        return 'Chancellor discards';
      case GameStatus.INVESTIGATING_LOYALTY:
        return 'Investigate Loyalty';
      case GameStatus.CALLING_SPECIAL_ELECTION:
        return 'Call Special Election';
      case GameStatus.POLICY_PEEKING:
        return 'Policy Peek';
      case GameStatus.EXECUTING:
        return 'Execution';
      case GameStatus.CALLING_VETO:
        return 'Veto';
      case GameStatus.STOPPED:
      case GameStatus.INITIALIZING:
      case GameStatus.SHOWING_ROLES:
      case GameStatus.PRE_GAME:
      case GameStatus.EXECUTIVE_ACTION:
      case GameStatus.ENACT_TOP_POLICY:
      case GameStatus.GAME_END:
        return '';
    }
  },

  gameInfo(state): GameInfo {
    const { playerCount, game: { liberalPolicies, fascistPolicies, drawPile, discardPile, failedElections } } = state;
    const liberalTrack = Array.from({length: 5}, (v, i) => i < liberalPolicies.length);
    const fascistTrack = Array.from({length: 6}, (v, i) => i < fascistPolicies.length);
    const electionTrack = Array.from({length: 4}, (v, i) => i === failedElections);
    let nextPower = '-';

    switch (fascistPolicies.length + 1) {
      case 1:
        if (playerCount >= 9) nextPower = 'Investigate Loyalty'; break;
      case 2:
        if (playerCount >= 7) nextPower = 'Investigate Loyalty'; break;
      case 3:
        if (playerCount <= 6) nextPower = 'Policy Peek';
        else if (playerCount >= 7) nextPower = 'Call Special Election';
        break;
      case 4:
        nextPower = 'Execution'; break;
      case 5:
        nextPower = 'Execution'; break;
      case 6:
        nextPower = 'Fascists Win'; break;
    }

    return {
      liberalTrack,
      fascistTrack,
      nextPower,
      drawPileAmount: drawPile.length,
      discardPileAmount: discardPile.length,
      electionTrack,
    };
  },

  allPlayers(state): Player[] {
    const { playerCount, players } = state;

    return players.filter((player: Player) => player.id < playerCount);
  },

  alivePlayers(state, getter): Player[] {
    const { playerCount, players } = state;

    return getter.allPlayers.filter((player: Player) => !player.dead);
  },

  eligibleChancellors(state, getter): Player[] {
    const { playerCount, game: { president } } = state;
    const players = getter.alivePlayers;
    const lastGovernment = getter.lastGovernment;

    if (president === null) return [];

    return players.filter((player: Player) => {
      if (player.id === president!.id) return false;
      if (lastGovernment) {
        if (player.id === lastGovernment.chancellor!.id) return false;
        if (players.length > 5
          && player.id === lastGovernment.president!.id) return false;
      }

      return true;
    });
  },

  government(state): Government | boolean {
    const { game: { president, chancellor } } = state;

    if (president === null || chancellor === null) return false;

    return { president, chancellor };
  },

  lastGovernment(state): Government | boolean {
    const { lastGovernment } = state.game;

    if (lastGovernment.president === null) return false;

    return lastGovernment;
  },

  drawnPolicies(state): Card[] {
    const { drawnPolicies } = state.game;

    return drawnPolicies;
  },

  hasVeto(state): boolean {
    const { fascistPolicies } = state.game;

    return fascistPolicies.length >= 5;
  },

  failedElections(state): number {
    return state.game.failedElections;
  },

  topOfDrawPile(state): Card[] {
    const { drawPile } = state.game;

    return drawPile.reduceRight((topCards, card: Card, index) => {
      if (index < drawPile.length - 3) return topCards;

      return topCards.concat(card);
    }, [] as Card[]);
  },
};
