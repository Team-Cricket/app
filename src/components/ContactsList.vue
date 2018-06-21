<template>
  <div>
    <div id="contacts">
      <pre v-if="error">{{ error }}</pre>
      <ul v-if="contacts !== null">
        <li
          v-for="contact in contacts"
          :key="contact.contactId"
          >
          <img class="delete-logo" @click="deleteEvent" width="15px" src="../assets/delete-icon.png">
          <strong>{{ contact.name }}</strong>
          <br>
          {{ contact.email }}
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import { getContactsForUser, deleteContact } from '../services/api';
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
  props: ['user'],
  methods: {
    handleDelete(contact) {
      const confirmDelete = confirm('Are you sure you want to delete contact?');
      if(confirmDelete === true) {
        console.log('Clicked confirm');
        const id = contact.contactId;
        // remove from server
        return deleteContact(this.contactId)
          .then(() => {
          // remove from current list of contacts
            const index = this.contacts.findIndex(contact => contact.contactId === id);
            if(index === -1) return;
            this.contacts.splice(index, 1);
          });
      } else {
        console.log('Clicked cancel');
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
}
li {
  max-width: 375px;
  margin: 10px;
}
.delete-logo {
  margin-right: 5px;
}
</style>
