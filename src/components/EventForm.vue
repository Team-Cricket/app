<template id="event-template">
  <section class="event-form">
    <h1>Event Form Component</h1>
    <h2>Add an Event</h2>
    <form @submit.prevent="handleSubmit">
      <label>
        Name:
        <br>
        <input type="text" name="name" placeholder="Event Name" required
          v-model="event.name">
      </label>

      <label>
        Date:
        <br>
        <input type="date" name="date" placeholder="Event Date" required
          v-model="event.eventdate">
      </label>

      <label>
        Description:
        <br>
        <textarea name="body" rows="8" cols="30"  
          v-model="event.description"></textarea>
      </label> 

      <label>
        <button type="submit">Add Event</button>
      </label>
      
      <label>
        <button type="reset">Clear</button>
      </label>

    </form>
    <pre>{{ error }}</pre>
  </section>
</template>

<script>

export default {
  data() {
    return {
      error: null,
      event: {
        name: '',
        date: '',
        description: ''
      }
    };
  },
  methods: {
    handleSubmit() {
      this.error = null;
      return addEvent(this.event)
        .then(saved => {
          this.$router.push(`/events/${saved.id}`);
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
  cursor: pointer;
}
input {
  font-size: 16px;
  text-align: center;
  cursor: pointer;
  border-radius: 3px;
}
label {
  display: block;
}
</style>
