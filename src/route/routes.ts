import {StandaloneGuard} from './guards';

const main = [
  {
    path: '/',
    component: () => import(/* webpackChunkName: "base" */ './views/Home.vue'),
    children: [
      { path: '', name: 'home', component: () => import(/* webpackChunkName: "base" */ './views/Home/Menu.vue') },
      {
        path: 'rules',
        name: 'rules',
        component: () => import(/* webpackChunkName: "rules" */ './views/Home/Rules.vue'),
      },
    ],
  },
  {
    path: '/vote-cards',
    name: 'voteCards',
    component: () => import(/* webpackChunkName: "standalone" */ './views/VoteCards.vue'),
  },
  {
    path: '/standalone',
    name: 'standalone',
    beforeEnter: StandaloneGuard,
    component: () => import(/* webpackChunkName: "standalone" */ './views/Standalone.vue'),
    children: [
      {
        path: 'player-count',
        name: 'standalone:playerCount',
        beforeEnter: StandaloneGuard,
        component: () => import(/* webpackChunkName: "standalone" */ './views/Standalone/PlayerCount.vue'),
      },
      {
        path: 'player-names',
        name: 'standalone:playerNames',
        beforeEnter: StandaloneGuard,
        component: () => import(/* webpackChunkName: "standalone" */ './views/Standalone/PlayerNames.vue'),
      },
    ],
  },
];

const error = [
  {
    path: '*',
    name: '404',
    redirect: '/',
  },
];

export default [...main, ...error];
