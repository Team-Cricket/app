<template>
  <div>
    <div id="contacts">
      <pre v-if="error">{{ error }}</pre>
      <ul v-if="contacts !== null">
        <li
          v-for="contact in contacts"
          :key="contact.contactId"
        >
          <!-- <router-link :to="`/events/${user.userId}`"> -->
          <router-link :to="`/contacts`"> 
            <strong>{{ contact.name }}</strong><br>
          </router-link>
          {{ event.description }}<br>&nbsp;
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {

  props: ['user', 'event']

};
</script>

<style>

</style>
