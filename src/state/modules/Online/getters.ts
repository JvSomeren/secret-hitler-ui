import {GetterTree} from 'vuex';
import {OnlinePlayer, OnlineState} from '@/state/modules/Online/types';
import {RootState} from '@/state/types';
import {getField} from 'vuex-map-fields';
import {GameStatus} from '@/state/modules/Standalone/types';

export const getters: GetterTree<OnlineState, RootState> = {
  getField,

  user(state): object {
    const { user } = state;

    return user;
  },

  gameState(state): object {
    const { lobbyId, playerCount, status, view } = state;

    return {
      lobbyId,
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
      default:
        return '';
    }
  },

  allPlayers(state): OnlinePlayer[] {
    const { players } = state;

    return players;
  },
};
