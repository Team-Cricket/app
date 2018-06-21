<template>
  <div>
    <div id="contacts">
      <pre v-if="error">{{ error }}</pre>
      <ul v-if="contacts !== null">
        <li
          v-for="contact in contacts"
          :key="contact.contactId"
          >
          <strong>{{ contact.name }}</strong>
          <br>
          {{ contact.email }}
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import { getContactsForUser } from '../services/api';
export default {
  data() {
    return {
      contacts: null,
      error: null,
      userId: this.user.userId
    };
  },
  created() {
    this.error = null;
    getContactsForUser(this.userId)
      .then(resultEvents => {
        this.contacts = resultEvents;
      })
      .catch(err => {
        this.error = err;
      });
  },
  props: ['user']

};
</script>

<style scoped>
#contacts {
  display: flex;
  flex-flow: row nowrap;
  justify-content: center;
}
div {
  text-align: left;
}

ul {
  list-style-type: none;
}
li {
  max-width: 375px;
  margin: 10px;
}
</style>
