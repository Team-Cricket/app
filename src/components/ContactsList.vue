<template>
  <div>
    <div id="contacts">
      <pre v-if="error">{{ error }}</pre>
      <ul v-if="contacts !== null">
        <li
          v-for="contact in contacts"
          :key="contact.contactId"
        >
          <img class="delete-logo" @click="handleDelete(contact)" width="15px" src="../assets/delete-icon.png">
          <router-link :to="`/contact/${contact.eventId}/${contact.contactId}`">
          <strong>{{ contact.name }}</strong>
          </router-link>
          <br>
          {{ contact.email }}
          <br>
          Saved on: {{ contact.created.substring(0, 10) }}
          <br>
          Event: {{ contact.eventName }} - {{ contact.eventDate.substring(0, 10) }}
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import { getContactsForUser, getContactsForEvent, deleteContact } from '../services/api';
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
    if(event) {
      console.log ('getting contacts for event', event);
      getContactsForEvent(this.event.eventId)
        .then(resultContacts => {
          this.contacts = resultContacts;
        })
        .catch(err => {
          this.error = err;
        });
    } else {
      console.log ('getting contacts for user', user);
      getContactsForUser(this.user.userId)
        .then(resultContacts => {
          this.contacts = resultContacts;
        })
        .catch(err => {
          this.error = err;
        });
    }
  },
  props: ['user', 'event'],
  methods: {
    handleDelete(contact) {
      const confirmDelete = confirm('Are you sure you want to delete ' + contact.name + '?');
      if(confirmDelete === true) {
        const id = contact.contactId;
        // remove from server
        return deleteContact(contact.contactId)
          .then(() => {
            // remove from current list of contacts
            const index = this.contacts.findIndex(contact => contact.contactId === id);
            if(index === -1) return;
            this.contacts.splice(index, 1);
          });
      }
    }
  }

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
  text-decoration: none;
}
li {
  max-width: 375px;
  list-style-type: none;
  text-decoration: none;
  margin-top: 5px;
  font-family: 'Poppins', sans-serif;
}
a {
  text-decoration: none;
}
.delete-logo {
  margin-right: 5px;
  cursor: pointer;
} 
strong {
  list-style-type: none;
  text-decoration: none;
}

</style>
