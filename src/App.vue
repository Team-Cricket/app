<template>
  <div id="app">
    <section v-if="user">
      <NavBar
      :user="user"
      :logout="handleLogout"
      ></NavBar>
    </section>
    <router-view :on-user="handleUser" :user="user"/>
    
    <section>
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
    </section>
   

    

  </div>
</template>

<script>
import NavBar from './components/NavBar';
export default {
  name: 'app',
  components: {
    NavBar
  },
  data() {
    return {
      user: null
    };
  },
  created() {
    const raw = localStorage.user;
    if(raw) {
      try {
        this.user = JSON.parse(raw);
      }
      catch(err) {
        localStorage.removeItem('user');
      }
    }
  },
  methods: {
    handleUser(user) {
      this.user = user;
      localStorage.user = JSON.stringify(user);
    },
    handleLogout() {
      localStorage.removeItem('user');
      this.user = null;
    }
  }

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
