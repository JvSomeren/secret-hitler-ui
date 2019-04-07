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
        component: () => import(/* webpackChunkName: "standalone" */ './views/Standalone/PlayerCount.vue'),
      },
      {
        path: 'player-names',
        name: 'standalone:playerNames',
        component: () => import(/* webpackChunkName: "standalone" */ './views/Standalone/PlayerNames.vue'),
      },
      {
        path: 'roles',
        name: 'standalone:showRoles',
        component: () => import(/* webpackChunkName: "standalone" */ './views/Standalone/ShowRoles.vue'),
      },
      {
        path: 'pre-game',
        name: 'standalone:preGame',
        component: () => import(/* webpackChunkName: "standalone" */ './views/Standalone/PreGame.vue'),
      },
      {
        path: 'initial-president',
        name: 'standalone:initialPresident',
        component: () => import(/* webpackChunkName: "standalone" */ './views/Standalone/InitialPresident.vue'),
      },
      {
        path: 'nominate-chancellor',
        name: 'standalone:nominateChancellor',
        component: () => import(/* webpackChunkName: "standalone" */ './views/Standalone/NominateChancellor.vue'),
      },
      {
        path: 'vote-on-government',
        name: 'standalone:voteOnGovernment',
        component: () => import(/* webpackChunkName: "standalone" */ './views/Standalone/VoteOnGovernment.vue'),
      },
      {
        path: 'president-discard-policy',
        name: 'standalone:presidentDiscardPolicy',
        component: () => import(/* webpackChunkName: "standalone" */ './views/Standalone/PresidentDiscardPolicy.vue'),
      },
      {
        path: 'chancellor-discard-policy',
        name: 'standalone:chancellorDiscardPolicy',
        component: () => import(/* webpackChunkName: "standalone" */ './views/Standalone/ChancellorDiscardPolicy.vue'),
      },
      {
        path: 'veto',
        name: 'standalone:veto',
        component: () => import(/* webpackChunkName: "standalone" */ './views/Standalone/Veto.vue'),
      },
      {
        path: 'executive-power',
        component: () => import(/* webpackChunkName: "standalone" */ './views/Standalone/ExecutivePower.vue'),
        children: [
          {
            path: 'investigate',
            name: 'standalone:executivePower:investigate',
            component: () => import(/* webpackChunkName: "standalone" */
              './views/Standalone/ExecutivePower/Investigate.vue'),
          },
          {
            path: 'peek',
            name: 'standalone:executivePower:peek',
            component: () => import(/* webpackChunkName: "standalone" */
              './views/Standalone/ExecutivePower/Peek.vue'),
          },
          {
            path: 'execute',
            name: 'standalone:executivePower:execute',
            component: () => import(/* webpackChunkName: "standalone" */
              './views/Standalone/ExecutivePower/Execute.vue'),
          },
        ],
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
