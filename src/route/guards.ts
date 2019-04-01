import {Route} from 'vue-router';
import store from '@/state';

export function StandaloneGuard(to: Route, from: Route, next: any) {
  const gameState = store.getters['standalone/gameState'];

  // if (gameState.status === 'stopped') return next({name: 'standalonePlayerCount'});

  next();
}
