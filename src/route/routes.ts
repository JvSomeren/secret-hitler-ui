import {OnlineGuard, StandaloneGuard} from './guards';
import {NavbarBackType} from '@/route/types';

const main = [
  {
    path: '/',
    component: () => import(/* webpackChunkName: "base" */ './views/Home.vue'),
    children: [
      {
        path: '',
        name: 'home',
        component: () => import(/* webpackChunkName: "base" */ './views/Home/Menu.vue'),
      },
      {
        path: 'rules',
        name: 'rules',
        component: () => import(/* webpackChunkName: "rules" */ './views/Home/Rules.vue'),
        meta: { navbar: { back: NavbarBackType.BACK, float: true } },
      },
      {
        path: 'host',
        name: 'host',
        component: () => import(/* webpackChunkName: "base" */ './views/Home/Host.vue'),
        meta: { navbar: { back: NavbarBackType.BACK, float: true } },
      },
      {
        path: 'join',
        name: 'join',
        component: () => import(/* webpackChunkName: "base" */ './views/Home/Join.vue'),
        meta: { navbar: { back: NavbarBackType.BACK, float: true } },
      },
    ],
  },
  {
    path: '/vote-cards',
    name: 'voteCards',
    component: () => import(/* webpackChunkName: "standalone" */ './views/VoteCards.vue'),
    meta: { navbar: { back: NavbarBackType.BACK } },
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
        meta: { navbar: { back: NavbarBackType.BACK, float: true } },
      },
      {
        path: 'player-names',
        name: 'standalone:playerNames',
        component: () => import(/* webpackChunkName: "standalone" */ './views/Standalone/PlayerNames.vue'),
        meta: { navbar: { back: NavbarBackType.BACK, float: true } },
      },
      {
        path: 'roles',
        name: 'standalone:showRoles',
        component: () => import(/* webpackChunkName: "standalone" */ './views/Standalone/ShowRoles.vue'),
        meta: { navbar: { back: NavbarBackType.END_PROMPT } },
      },
      {
        path: 'pre-game',
        name: 'standalone:preGame',
        component: () => import(/* webpackChunkName: "standalone" */ './views/Standalone/PreGame.vue'),
        meta: { navbar: { back: NavbarBackType.END_PROMPT, float: true } },
      },
      {
        path: 'initial-president',
        name: 'standalone:initialPresident',
        component: () => import(/* webpackChunkName: "standalone" */ './views/Standalone/InitialPresident.vue'),
        meta: { navbar: { back: NavbarBackType.END_PROMPT, float: true } },
      },
      {
        path: 'nominate-chancellor',
        name: 'standalone:nominateChancellor',
        component: () => import(/* webpackChunkName: "standalone" */ './views/Standalone/NominateChancellor.vue'),
        meta: { navbar: { back: NavbarBackType.END_PROMPT, status: true, info: true } },
      },
      {
        path: 'vote-on-government',
        name: 'standalone:voteOnGovernment',
        component: () => import(/* webpackChunkName: "standalone" */ './views/Standalone/VoteOnGovernment.vue'),
        meta: { navbar: { back: NavbarBackType.END_PROMPT, status: true, info: true } },
      },
      {
        path: 'president-discard-policy',
        name: 'standalone:presidentDiscardPolicy',
        component: () => import(/* webpackChunkName: "standalone" */ './views/Standalone/PresidentDiscardPolicy.vue'),
        meta: { navbar: { back: NavbarBackType.END_PROMPT, status: true, info: true } },
      },
      {
        path: 'chancellor-discard-policy',
        name: 'standalone:chancellorDiscardPolicy',
        component: () => import(/* webpackChunkName: "standalone" */ './views/Standalone/ChancellorDiscardPolicy.vue'),
        meta: { navbar: { back: NavbarBackType.END_PROMPT, status: true, info: true } },
      },
      {
        path: 'veto',
        name: 'standalone:veto',
        component: () => import(/* webpackChunkName: "standalone" */ './views/Standalone/Veto.vue'),
        meta: { navbar: { back: NavbarBackType.END_PROMPT, status: true, info: true } },
      },
      {
        path: 'game-end',
        name: 'standalone:gameEnd',
        component: () => import(/* webpackChunkName: "standalone" */ './views/Standalone/GameEnd.vue'),
        meta: { navbar: { info: true, float: true } },
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
            meta: { navbar: { back: NavbarBackType.END_PROMPT, status: true, info: true } },
          },
          {
            path: 'peek',
            name: 'standalone:executivePower:peek',
            component: () => import(/* webpackChunkName: "standalone" */
              './views/Standalone/ExecutivePower/Peek.vue'),
            meta: { navbar: { back: NavbarBackType.END_PROMPT, status: true, info: true } },
          },
          {
            path: 'special-election',
            name: 'standalone:executivePower:specialElection',
            component: () => import(/* webpackChunkName: "standalone" */
              './views/Standalone/ExecutivePower/SpecialElection.vue'),
            meta: { navbar: { back: NavbarBackType.END_PROMPT, status: true, info: true } },
          },
          {
            path: 'execute',
            name: 'standalone:executivePower:execute',
            component: () => import(/* webpackChunkName: "standalone" */
              './views/Standalone/ExecutivePower/Execute.vue'),
            meta: { navbar: { back: NavbarBackType.END_PROMPT, status: true, info: true } },
          },
        ],
      },
    ],
  },
  {
    path: '/:id',
    name: 'online',
    beforeEnter: OnlineGuard,
    component: () => import(/* webpackChunkName: "online" */ './views/Online.vue'),
    children: [],
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
