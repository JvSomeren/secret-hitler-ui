import {Route} from 'vue-router';
import store from '@/state';
import {GameStatus} from '@/state/modules/Standalone/types';

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

  if (!isOnline) return next({name: 'home'});

  next();
}
