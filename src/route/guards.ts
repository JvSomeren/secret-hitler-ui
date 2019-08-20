import {Route} from 'vue-router';
import store from '@/state';
import {GameStatus} from '@/state/modules/Standalone/types';
import {onlineMutations} from '@/state/modules/Online/mutations';

export function StandaloneGuard(to: Route, from: Route, next: any) {
  const gameState = store.getters['standalone/gameState'];

  if (gameState.status === GameStatus.STOPPED &&
    ( (gameState.playerCount === 0 && to.name !== 'standalone:playerCount' ) ||
      (to.name !== 'standalone:playerCount' && to.name !== 'standalone:playerNames'))) {
    return next({name: 'standalone:playerCount'});
  } else if (gameState.status !== GameStatus.STOPPED && gameState.view !== to.name) {
    return next({name: gameState.view});
  }

  next();
}

export function OnlineGuard(to: Route, from: Route, next: any) {
  const { isOnline } = store.state;
  const gameState = store.getters['online/gameState'];
  const { name } = store.getters['online/user'];


  if (!isOnline) return next({name: 'home'});
  if (name === '') {
    const query = to.params.hasOwnProperty('id') ? {lobbyId: to.params.id} : null;
    return next({name: 'join', query});
  } else if (to.name === 'online:lobby' && to.params.id !== gameState.lobbyId) {
    store.commit(`online/${onlineMutations.resetState}`);
    return next({name: 'join', query: {lobbyId: to.params.id}});
  }

  next();
}
