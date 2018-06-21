<template>
  <div>
    <div id="dashboard-content">
      <router-link class="router-link" to="/dashboard/events">Events</router-link>

      &nbsp;
      <router-link class="router-link" to="/dashboard/contacts">Contacts</router-link>
      
    </div>
    <router-view :user="user" :event="event"/>
  </div>
</template>

<script>
export default {
  props: ['user', 'event']

};
</script>

<style scoped>
#dashboard-content {
  display: flex;
  flex-flow: row nowrap;
  justify-content: center;
}
.router-link {
  background-color: #FF7546;
  color: #fff;
  margin-top: 25%;
  cursor: pointer;
  text-decoration: none;
  width: 140px;
  height: 60px;
  text-align: center;
  font-family: 'Poppins', sans-serif;
  font-weight: 700;
  vertical-align: middle;
  line-height: 60px;
} 
</style>