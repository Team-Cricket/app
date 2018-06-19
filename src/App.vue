<template>
  <div id="app">
    <NavBar
    :user="user"
    ></NavBar>
    <router-view/>
    
    
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
    'NavBar': NavBar
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
