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
          <strong>{{ event.name }}</strong> 
          <div id="details">
            <h4 class="date">{{ event.eventDate.substring(0, 10) }}</h4> 
            <br>
            <h4>{{ event.count }} contact</h4>
          </div>
          </router-link>
          <br>
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
      const confirmDelete = confirm('Are you sure you want to delete this event and ' + event.count + ' contacts?');
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

strong:hover {
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
  font-weight: 500;
  color:#00aa8f;
  margin: 0px;
  display: inline;
}

p {
  font-family: 'Poppins', sans-serif;
  font-weight: 400;
  font-size: 14px;
  max-width: 92%; 
  margin: 0px;
}

a {
  text-decoration: none;
  width: 90px;
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
  padding-left:30px;
}

li {
  list-style: none;
  padding: 0px;
}
.delete-logo {
  margin-top: 10px;
  margin-right: 5px;
  margin-bottom: 11px;
  cursor: pointer;
}
hr {
  margin-right: 30px;
}

</style>