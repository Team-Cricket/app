<template>
  <div>
    <h1>Dashboard View Component</h1>
    <router-view :user="user" :event="event"/>
  </div>
</template>

<script>
export default {
  props: ['user', 'event']

};
</script>

<style>

</style>
