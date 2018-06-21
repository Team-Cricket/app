<template>
  <div>
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
#navlogo {
  max-width: 18%;
  margin-top: -18px;
  margin-right: 0px;
  padding: 0px;
  float: left;
}
nav {
 background-color: #333;
 display: inline;
 padding: 20px;
 box-shadow: 0px 0px 5px 4px #ccc;
}
nav a {
  font-family: 'Poppins', sans-serif;
  font-weight: 700;
  text-decoration: none;
  padding: 0px;
  text-align: center;
  margin-top: 0px;
  color:#fff;
}
nav a:active {
  color: #333;
  background-color: #EFEB3E;
}



</style>
