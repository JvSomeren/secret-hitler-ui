import {Module} from 'vuex';
import {Player, StandaloneState} from './types';
import {RootState} from '../../types';
import {actions} from './actions';
import {getters} from './getters';
import {mutations} from './mutations';

const createPlayersArray = (n: number = 10) => {
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

export const state: StandaloneState = {
  status: 'stopped',
  playerCount: 0,
  players: createPlayersArray(),
};

const namespaced: boolean = true;

export const standalone: Module<StandaloneState, RootState> = {
  namespaced,
  state,
  getters,
  actions,
  mutations,
};
