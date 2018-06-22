<template>
  <div>
    <div id="dashboard-content">
      <router-link class="router-link" to="/dashboard/events">EVENTS</router-link>
        &nbsp;
      <router-link class="router-link" to="/dashboard/contacts">CONTACTS</router-link>
    </div>
    <div class="event-list">
      <router-view :user="user" :event="event"/>
    </div>
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
  margin-top: 10%;
}

.router-link {
  background-color: #FF7546;
  color: #fff;
  cursor: pointer;
  text-decoration: none;
  width: 180px;
  height: 50px;
  text-align: center;
  font-family: 'Poppins', sans-serif;
  font-weight: 700;
  vertical-align: middle;
  line-height: 50px;
  letter-spacing: .2em;
} 

.router-link:hover {
  background-color:#39499B;
}
</style>