<template>
  <div>
    <div id="dashboard-content">
      <router-link class="router-link" to="/dashboard/events">Events</router-link>
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
  margin-top: 10%;
}
</style>
