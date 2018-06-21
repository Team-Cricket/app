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
          <router-link :to="`/events`"> 
            <h3>{{ event.name }}</h3> 
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
      userId: this.user.userId
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
    deleteEvent(event) {
      const id = event.eventId;
      // remove from server
      return deleteEvent(this.eventId)
        .then(() => {
          // remove from current list of events
          const index = this.events.findIndex(event => event.eventId === id);
          if(index === -1) return;
          this.events.splice(index, 1);
        });
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


</style>
