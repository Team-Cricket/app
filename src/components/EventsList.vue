<template>
  <div>
    <div id="events">
      <pre v-if="error">{{ error }}</pre>
      <ul v-if="events !== null">
        <li
          v-for="event in events"
          :key="event.eventId"
        >
          <!-- <router-link :to="`/events/${user.userId}`"> -->
            <img class="delete-logo" @click="handleDelete(event)" width="15px" src="../assets/delete-icon.png">
          <router-link :to="`/event/${event.eventId}`"> 
            <h3>{{ event.name }}</h3> 
            <h3>{{ event.eventDate.substring(0, 10) }}</h3> 
            <h4>{{ event.count }} contacts</h4>
            <br>
          </router-link>
          <p>{{ event.description }}</p>
          <hr>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import { getEvents, deleteEvent } from '../services/api';

export default {
  data() {
    return {
      events: null,
      error: null, 
      userId: this.user.userId,
    };
  },
  created() {
    this.error = null;
    getEvents(this.userId)
      .then(resultEvents => {
        this.events = resultEvents;
      })
      .catch(err => {
        this.error = err;
      });
  },
  props: ['user'],
  methods: {
    handleDelete(event) {
      const confirmDelete = confirm('Are you sure you want to delete this event and all associated contacts?');
      if(confirmDelete === true) {
        const id = event.eventId;
        // remove from server
        return deleteEvent(event.eventId)
          .then(() => {
            // remove from current list of events
            const index = this.events.findIndex(event => event.eventId === id);
            if(index === -1) return;
            this.events.splice(index, 1);
          });
      }
    }
  }
};
</script>


<style scoped>
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

h3 {
  font-family: 'Source Serif Pro', serif;
  font-weight: 700;
  color:#00AA8F;
}

h4 {
  font-family: 'Poppins', sans-serif;
  font-weight: 700;
  color:#00AA8F;
}

p {
  font-family: 'Poppins', sans-serif;
  font-weight: 400;
  font-size: 12px;
  max-width: 80%; 
}

a {
  text-decoration: none;
}

#events {
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
}
.delete-logo {
  margin-right: 5px;
  cursor: pointer;
}


</style>
