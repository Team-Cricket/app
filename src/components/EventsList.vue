<template>
  <div id="events">
    <h2>Events List</h2>
    <button v-on:click="openNewEvent">add event</button>
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
</template>

<script>
import { getEvents } from '../services/api';

export default {
  data() {
    return {
      events: null,
      error: null, 
      userId: 1  // dummy data -- will pull from params
    };
  },
  created() {
    this.error = '';
    getEvents(this.userId)
      .then(events => {
        this.events = events;
      })
      .catch(err => {
        this.error = err;
      });
  }, 
  methods: {
    openNewEvent() {
      this.$router.push('/event');
    }
  }
};
</script>


<style scoped>

div {
  text-align: left;
}

ul {
  list-style-type: none;
}


</style>
