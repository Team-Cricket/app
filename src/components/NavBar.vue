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
 background-color: #333;
 display: inline;
 padding: 20px;
}
nav a {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  font-size: 1.2em;
  font-weight: bolder;
  text-decoration: none;
  padding: 8px;
  text-align: center;
  margin-top: 0px;
  color:#fff;
}
nav a:hover {
  color: #EFEB3E;
  background-color: #00AA8F;
}

nav a:active{
  color: #fff;
  background-color: #00AA8F;
}

</style>
