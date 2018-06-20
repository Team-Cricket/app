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
        <br>
          <select v-model="contact.companyId"> 
            <option v-for="company in companies"
            :key="company.id"
            :value="company.id"
            >{{ company.name }}</option> 
          </select>    
      </label>
      <label v-if="contact.companyId===0">
        New Company:
        <br>
        <input type="text" placeholder="New Company"
          v-model="newCompany">
      </label>
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
import { getCompanies } from '../services/api';
import { addCompany } from '../services/api';
export default {
  data() {
    return {
      companies: [],
      newCompany:'',
      error: null,
      contact: {
        name: '',
        companyId: null,
        email: '',
        other: '',
        notes: '',
        userId: this.user.userId,
        eventId: this.$route.params.id
      }
    };
  },
  created() {
    this.error = null;
    getCompanies()
      .then(resultCompanies => {
        this.companies = resultCompanies;
        this.companies.push({ name: 'Add new company', id:0 });
      })
      .catch(err => {
        this.error = err;
      });
  },
  props: ['user', 'event'],
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
