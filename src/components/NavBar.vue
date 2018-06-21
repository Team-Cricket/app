<template>
  <div>
    <nav>
      <router-link to="/event">New Event</router-link>
      &nbsp;
      <router-link to="/dashboard">Dashboard</router-link>
      &nbsp;
      <router-link v-if="user" to="/"><span @click="logout">Logout</span></router-link>
    </nav>
  </div>
</template>

<script>
export default {
  props: ['user', 'logout']
};
</script>

<style>
nav {
 background-color: #EFEB3E;
}
nav a {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  font-size: 1.5em;
  font-weight: bolder;
  text-decoration: none;
  padding: 8px;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  margin-top: 60px;
  color:#00AA8F;
}
nav a:hover {
  color: #fff;
  background-color: #00AA8F;
}

nav a:active{
  color: #fff;
  background-color: #00AA8F;
}

</style>
