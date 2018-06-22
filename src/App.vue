<template>
  <div id="app">
    <section v-if="user">
      
      <NavBar
      :user="user"
      :logout="handleLogout"
      >
      </NavBar>
    </section>

    <router-view :on-user="handleUser" :user="user"/>
    
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
@import url('https://fonts.googleapis.com/css?family=Poppins:200,400,700|Source+Serif+Pro:400,600');
/* font-family: 'Poppins', sans-serif;
font-family: 'Source Serif Pro', serif; */
body {
  margin-left: 0px;
  margin-right: 0px;
  margin-top: 10px;
}

#app { 
  color: #333;
}

h1 {
  font-family: 'Poppins', sans-serif;
  font-weight: 700;
}

h2 {
  font-family: 'Source Serif Pro', serif;
  font-weight: 400;
  color:#00AA8F;
}

p {
  font-family: 'Poppins', sans-serif;
  font-weight: 400;
}

a:hover {
  color: #FF7546;
}

a:active {
  color: #FF7546;
}

input {
  border: solid 1px #999;
}

textarea {
  border: solid 1px #999;
}

select {
  border: solid 1px #999;
}


</style>
