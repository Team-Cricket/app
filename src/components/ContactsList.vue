<template>
  <div>
    <div id="contacts">
      <pre v-if="error">{{ error }}</pre>
      <ul v-if="contacts !== null">
        <li
          v-for="contact in contacts"
          :key="contact.contactId"
        >
          <router-link :to="`/contact/${contact.eventId}/${contact.contactId}`">
          <h2>{{ contact.name }}</h2>
           </router-link>
          <div id="details">
          <h4>Email:</h4>
          <p>{{ contact.email }}</p>
          <h4>Saved On:</h4>
          <p>{{ contact.created.substring(0, 10) }}</p>
          <h4>Event:</h4>
          <p>{{ contact.eventName }} - {{ contact.eventDate.substring(0, 10) }}</p>
          <img class="delete-logo" @click="handleDelete(contact)" width="15px" src="../assets/delete-icon.png">
           <h4 class="delete-label" @click="handleDelete(contact)">Delete Contact</h4>
         
          </div>
          <hr>
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
strong {
  font-family: 'Source Serif Pro', serif;
  font-weight: 900;
  font-size: 16px;
  color: #333;
  margin-top: 10px;
  margin-bottom: 5px;
  padding: 5px 30px 5px 5px;
  text-decoration: none;
  float: right;
  max-width: 60%;
  letter-spacing: .05em; 
  border: solid #00AA8F;
  border-width: 2px 0px 0px 2px;
}

h2:hover {
  color:#FF7546;
}

body {
  margin-left: 0px;
  margin-right: 0px;
}

h1 {
  font-family: 'Poppins', sans-serif;
  font-weight: 700;
}

h2 {
  font-family: 'Source Serif Pro', serif;
  font-weight: 400;
  color:#00AA8F;
}

h4 {
  font-family: 'Source Serif Pro', serif;
  font-weight: 900;
  color:#00aa8f;
  display: inline;
}

p {
  font-family: 'Poppins', sans-serif;
  font-weight: 400;
  font-size: 14px;
  max-width: 92%; 
  margin: 0px;
  color: #333;
}

a {
  text-decoration: none;
  width: 90px;
}

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
  padding-left: 30px;
}

li {
  list-style: none;
  padding: 0px;
}


hr {
  margin-right: 30px;
}

.delete-label {
  font-family: 'Poppins', sans-serif;
  font-weight: 700;
  color: #333;
}

</style>
