<template id="contact-template">
  <section class="contact-form">
    <h2>Contact</h2>
    <form @submit.prevent>

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
        <input type="email" name="email" placeholder="Email" 
          v-model="contact.email">
      </label>

      <label>
        Other contact information:
        <br>
        <input type="other" name="other" placeholder="LinkedIn? Phone?" 
          v-model="contact.other">
      </label>

      <label>
        Notes:
        <br>
        <textarea name="body" rows="8" cols="30"  
          v-model="contact.notes" placeholder="Notes Notes Notes"></textarea>
      </label> 

      <label>
        <button v-if="!contact.contactId" type="submit" @click="handleAdd">Add Contact</button>
        <button v-else type="submit" @click="handleUpdate">Update Contact</button>
      </label>
      
      <label>
        <button type="reset">Clear</button>
      </label>

    </form>
    <pre>{{ error }}</pre>
  </section>
</template>

<script>
import { getCompanies, addCompany, addContact, getContact, updateContact } from '../services/api';

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
        eventId: this.$route.params.eventId,
        contactId: this.$route.params.contactId
      }
    };
  },
  created() {
    const id = this.$route.params.contactId;
    this.populateCompanies();
    if(id) {
      return getContact(id)
        .then(result => {
          this.contact.name = result.name;
          this.contact.companyId = result.companyId;
          this.contact.email = result.email;
          this.contact.other = result.other;
          this.contact.notes = result.notes;
        })
        .catch(err => {
          this.error = err;
        });
    }
  },
  props: ['user', 'event'],
  methods: {
    clearForm() {
      this.contact.name = '';
      this.contact.companyId = '';
      this.contact.email = '';
      this.contact.other = '';
      this.contact.notes = '';
      this.newCompany = '';
    },
    handleAdd() {
      this.error = null;
      if(this.contact.companyId === 0) {
        return addCompany ({ 'name':this.newCompany }) 
          .then(result => {
            this.contact.companyId = result.companyId;
            return addContact(this.contact);
          }).then(saved => {
            alert (saved.name + ' added as contact.');
            this.clearForm();
            this.populateCompanies();
          })
          .catch(err => {
            this.error = err;
          });
      }
      return addContact(this.contact)
        .then(saved => {
          alert (saved.name + ' added as contact.');
          this.clearForm();
        })
        .catch(err => {
          this.error = err;
        });
    }, 
    handleUpdate() {
      this.error = null;
      if(this.contact.companyId === 0) {
        return addCompany ({ 'name':this.newCompany }) 
          .then(result => {
            this.contact.companyId = result.companyId;
            return updateContact(this.contact);
          }).then(() => {
            this.$router.push('/dashboard/contacts');
          })
          .catch(err => {
            this.error = err;
          });
      }
      return updateContact(this.contact)
        .then(() => {
          this.$router.push('/dashboard/contacts');
        })
        .catch(err => {
          this.error = err;
        });
    }, 
    populateCompanies() {
      this.error = null;
      getCompanies()
        .then(resultCompanies => {
          this.companies = resultCompanies;
          this.companies.unshift ('');
          this.companies.push({ name: 'Add new company', id:0 });
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
