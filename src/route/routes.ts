const main = [
  {
    path: '/',
    name: 'home',
    component: () => import(/* webpackChunkName: "base" */ '../views/Home.vue'),
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
