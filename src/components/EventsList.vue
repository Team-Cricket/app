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
            <strong>{{ event.name }}</strong> ({{ event.count }} contacts)<br>
          </router-link>
          {{ event.description }}<br>&nbsp;
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
      return deleteEvent(eventId)
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
