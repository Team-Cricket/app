<template id="event-template">
  <section class="event-form">
    <h1 class="comp-title">Networking Event</h1>
    <p class="sub">Fill in some details about your networking opportunity:</p>
    <pre>{{ error }}</pre>
    <form @submit.prevent>
      <label>
        Event Name:
        <br>
        <input type="text" name="name" placeholder="Event Name" required
          v-model="event.name">
      </label>

      <label>
        Event Date:
        <br>
        <input type="date" name="date" placeholder="Event Date" required
          v-model="event.eventDate">
      </label>

      <label>
        Description:
        <br>
        <textarea name="body" rows="8" cols="30"  
          v-model="event.description"></textarea>
      </label> 
      
      <label>
        <router-link :to="`/contact/${event.eventId}`">
          <button v-if="event.eventId">ADD CONTACT</button>
        </router-link>
      </label>

      <label>
        <br>
        <button v-if="!event.eventId" type="submit" @click="handleAdd">ADD EVENT</button>
        <button v-else type="submit" @click="handleUpdate">UPDATE EVENT</button>
      </label>
      
      <label>
        <button class="clear" v-on:click="clearForm" type="button">clear form</button>
      </label>

    </form>

    <ContactsList :user="user"></ContactsList>

    <img class="stripe" src="../assets/codestripe.png">
    
  </section>
</template>

<script>
import { addEvent, getEvent, updateEvent } from '../services/api';
import ContactsList from './ContactsList';

export default {
  data() {
    return {
      error: null,
      event: {
        userId: this.user.userId,
        name: '',
        eventDate: '',
        eventId: null,
        description: ''
      }
    };
  },
  components: {
    ContactsList
  },
    
  created() {
    const id = this.$route.params.eventId;
    if(id) {
      return getEvent(id)
        .then(result => {
          this.event.name = result.name;
          this.event.eventDate = result.eventDate.substring(0, 10);
          this.event.eventId = result.eventId;
          this.event.description = result.description;
        })
        .catch(err => {
          this.error = err;
        });
    }
  },
  props: ['user'],
  methods: {
    clearForm() {
      this.event.name = '';
      this.event.eventDate = '';
      this.event.description = '';
    },
    handleAdd() {
      this.error = null;
      return addEvent(this.event)
        .then(saved => {
          this.$router.push(`/contact/${saved.eventId}`);
        })
        .catch(err => {
          this.error = err;
        });
    },
    handleUpdate() {
      this.error = null;
      return updateEvent(this.event)
        .then(() => {
          this.$router.push('/dashboard');
        })
        .catch(err => {
          this.error = err;
        });
    }
  }
};
</script>

<style scoped>

.event-form {
  margin-top: 10%;
  text-align: center;
}
.comp-title {
  background-color:#39499B;
  color: #fff;
  padding: 10px; 
}
.sub {
  font-family: 'Source Serif Pro', serif;
  font-weight: 400;
  color: #00AA8F;
  font-style: oblique;
  max-width: 300px;
  margin-left: 12%;
}
pre {
  font-family: 'Poppins', sans-serif;
  color:#FF7546; 
}
button {
  font-family: 'Poppins', sans-serif;
  font-weight: 700;
  letter-spacing: .2em;
  background-color: #FF7546;
  color: #fff;
  padding: 10px 10px;
  border: none;
  width: 180px;
}
button:active {
  background-color: #fff;
  color: #FF7546;
}
.clear {
  font-family: 'Poppins', sans-serif;
  font-weight: 700;
  color: #FF7546;
  letter-spacing: .2em;
  background-color: #FFF;
  border: solid 2px #FF7546 !important;
  margin: 10px;
  padding: 10px 10px;
  border: none;
  width: 180px;
}
.clear:active {
  background-color: rgba(255, 116, 70, 0.283);
}
input {
  margin-bottom: 20px;
  padding-left: 5px;
  width: 180px;
  height: 20px;
  text-align: center;
}
label {
   font-family: 'Poppins', sans-serif;
   font-weight: 700;
   display: block;
 } 
.stripe {
  width: 100%;
}
</style>
