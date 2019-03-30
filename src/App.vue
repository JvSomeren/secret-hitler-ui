<template>
  <main id="app">
    <router-view />
  </main>
</template>

<style lang="scss">
@import 'normalize-scss';
@include normalize();

* {
  user-select: none;
}

html,
body {
  height: 100%;
}

#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  background-color: #FBB969;

  height: 100%;
  display: flex;
}

.root-container {
  width: 100%;
  display: flex;
  flex-direction: column;
}

.header {
  flex: 1;
}

.header-logo {
  display: flex;
  justify-content: center;
  align-items: center;
}

.main {
  flex: 3;

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
}

h2 {
  font-family: 'Futura', sans-serif;;
  font-weight: 700;
  color: #434343;
  margin-top: 0;
  margin-bottom: 8px;
}

.sh-bottom {
  margin-top: auto;
}
</style>
