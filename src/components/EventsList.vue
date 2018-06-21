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
            <img class="delete-logo" @click="handleDelete" width="15px" src="../assets/delete-icon.png">
            <strong>{{ event.name }}</strong> ({{ event.count }} contacts)
            <br>
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
        console.log('Clicked confirm');
        const id = event.eventId;
        // remove from server
        return deleteEvent(this.eventId)
          .then(() => {
          // remove from current list of events
            const index = this.events.findIndex(event => event.eventId === id);
            if(index === -1) return;
            this.events.splice(index, 1);
          });
      } else {
        console.log('Clicked cancel');
      }
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
.delete-logo {
  margin-right: 5px;
}


</style>
