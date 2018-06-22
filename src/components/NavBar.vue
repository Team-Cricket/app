<template>
  <div id="navBar">
    <nav>
      <img id="navlogo" src="../assets/alchemy-connect-logo-bk.png">
      <router-link to="/event">NEW EVENT</router-link>
      &nbsp;
      <router-link to="/dashboard">DASHBOARD</router-link>
      &nbsp;
      <router-link v-if="user" to="/"><span @click="logout">LOGOUT</span></router-link>
    </nav>
  </div>
</template>

<script>
export default {
  props: ['user', 'logout']
};
</script>

<style>
#navBar {
  position: relative;
  top: 0;
  right: 0;
  width: 100%;
  margin-top: 0px;
}

#navlogo {
  max-width: 18%;
  margin-right: 0px;
  padding: 0px;
  margin-top: -18px;
  float: left;
}

nav {
 background-color: #333;
 display: inline;
 padding: 18px;
 box-shadow: 0px 0px 5px 4px #ccc;
}
nav a {
  font-family: 'Poppins', sans-serif;
  font-weight: 700;
  text-decoration: none;
  text-align: center;
  color:#fff;

}




</style>
