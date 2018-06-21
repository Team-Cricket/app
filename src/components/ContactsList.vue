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
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import { getContacts } from '../services/api';
export default {
  created() {
    this.error = null;
    getContacts(this.userId)
      .then(resultEvents => {
        this.events = resultEvents;
      })
      .catch(err => {
        this.error = err;
      });
  },
  props: ['user', 'event']

};
</script>

<style>

</style>
