<template id="contact-template">
  <section class="contact-form">
    <h1>Contact Form Component</h1>
    <h2>Contact Form</h2>
    <form @submit.prevent="handleSubmit">
      <label>
        Name:
        <br>
        <input type="text" name="name" placeholder="Contact Name" required
          v-model="contact.name">
      </label>

      <label>
        Company:
        </label>
          <select v-model="selected">
            <option disabled value="">Please select one</option>
            <option>Alchemy</option>
            <option>Ebay</option>
            <option>Adidas</option>
            <option>Google</option>
          </select>    

      <label>
        Email:
        <br>
        <input type="email" name="email" required placeholder="Email" 
          v-model="contact.email">
      </label>

      <label>
        Notes:
        <br>
        <textarea name="body" rows="8" cols="30"  
          v-model="contact.notes" placeholder="Notes Notes Notes"></textarea>
      </label> 

      <label>
        <button type="submit">Add Contact</button>
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
    selected: []
    return {
      error: null,
      contact: {
        name: '',
        company: '',
        email: '',
        other: '',
        notes: ''
      }
    };
  },
  methods: {
    handleSubmit() {
      this.error = null;
      return addContact(this.contact)
        .then(saved => {
          this.$router.push(`/contacts/${saved.id}`);
        })
        .catch(err => {
          this.error = err;
        });
    }
  }
};
</script>

<style scoped>


.contact-form {
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
