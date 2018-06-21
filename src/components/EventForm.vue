<template id="event-template">
  <section class="event-form">
    <h2>Event</h2>
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
        <button v-if="!event.eventId" type="submit" @click="handleAdd">Add Event</button>
        <button v-else type="submit" @click="handleUpdate">Update Event</button>
      </label>
      
      <label>
        <button v-on:click="clearForm" type="button">Clear</button>
      </label>

    </form>
    <pre>{{ error }}</pre>
  </section>
</template>

<script>
import { addEvent, getEvent, updateEvent } from '../services/api';

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
    
  created() {
    const id = this.$route.params.eventId;
    if(id) {
      return getEvent(id)
        .then(result => {
          this.event.name = result.name;
          this.event.eventDate = result.eventDate.substring(0, 10);
          this.event.eventId = result.eventId;
          this.event.description = result.description;
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
  margin-top: 50px;
  font-size: 18px;
}
button {
  font-size: 18px;
  border-radius: 2px;
}
input {
  font-size: 16px;
  text-align: center;
}
label {
   font-family: 'Poppins', sans-serif;
   font-weight: 700;
   display: block;
 } 
</style>
