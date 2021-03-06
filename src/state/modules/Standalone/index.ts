import {Module} from 'vuex';
import {GameStatus, Player, StandaloneState} from './types';
import {RootState} from '../../types';
import {actions} from './actions';
import {getters} from './getters';
import {mutations} from './mutations';

const createPlayersArray = (n: number = 10): Player[] => {
  const defaultPlayer = {
    id: 0,
    name: '',
    role: null,
    president: false,
    chancellor: false,
    dead: false,
  };

  const arr = [];
  for (let i = 0; i < n; i++) arr[i] = {...defaultPlayer, id: i};
  return arr;
};

export const state = (): StandaloneState => {
  return {
    status: GameStatus.STOPPED,
    view: 'standalone:playerCount',
    game: {
      drawPile: [],
      discardPile: [],
      drawnPolicies: [],
      liberalPolicies: [],
      fascistPolicies: [],
      president: null,
      chancellor: null,
      lastGovernment: {
        president: null,
        chancellor: null,
      },
      failedElections: 0,
      nextPresident: null,
      endResult: null,
    },
    playerCount: 0,
    players: createPlayersArray(),
  };
};

const namespaced: boolean = true;

export const standalone: Module<StandaloneState, RootState> = {
  namespaced,
  state,
  getters,
  actions,
  mutations,
};
