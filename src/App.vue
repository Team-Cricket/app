<template>
  <div id="app">
    <nav>
      <router-link to="/">Login</router-link>
      &nbsp;
      <router-link to="/event">Event</router-link>
      &nbsp;
      <router-link to="/contact">Contact</router-link>
      &nbsp;
      <router-link to="/dashboard">Dashboard</router-link>
      &nbsp;
      <router-link to="/dashboard/events">Events List</router-link>
      &nbsp;
      <router-link to="/dashboard/contacts">Contacts List</router-link>
      
    </nav>
    <router-view/>

    

  </div>
</template>

<script>


export default {
  
};
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
