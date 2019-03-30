const main = [
  {
    path: '/',
    component: () => import(/* webpackChunkName: "base" */ './views/Home.vue'),
    children: [
      { path: '', name: 'home', component: () => import(/* webpackChunkName: "base" */ './views/Home/Menu.vue') },
      {
        path: 'standalone-lobby',
        name: 'standalone-lobby',
        component: () => import(/* webpackChunkName: "standalone" */ './views/Home/StandaloneLobby.vue'),
      },
      {
        path: 'rules',
        name: 'rules',
        component: () => import(/* webpackChunkName: "rules" */ './views/Home/Rules.vue'),
      },
    ],
  },
  {
    path: '/vote-cards',
    name: 'vote-cards',
    component: () => import(/* webpackChunkName: "standalone" */ './views/VoteCards.vue'),
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
