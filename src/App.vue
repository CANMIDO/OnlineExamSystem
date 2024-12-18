<template>
  <div id="app">
    <UserHeader/>
    <keep-alive :include="['UserLogin','UserRegister']">
      <router-view></router-view>
    </keep-alive>
    
  </div>
</template>

<script>
import UserHeader from './components/UserHeader.vue'
// import UserFooter from './components/UserFooter.vue'
export default {
  name: 'App',
  components: {
    UserHeader,
  }
}
</script>

<style>
/* #app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
} */
* {
  padding: 0;
  margin: 0;
  text-decoration: none;
  list-style: none;
}
</style>
