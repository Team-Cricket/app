<template id="contact-template">
  <div class="contact-form">
    <h1 class="comp-title">Contact</h1>
    <p class="sub">Add details on who you connected with:</p>
    <pre>{{ error }}</pre>

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
            <option disabled value="">Please select one</option>
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
        <textarea name="body" rows="8" cols="32"  
          v-model="contact.notes" placeholder="Notes Notes Notes"></textarea>
      </label> 

      <label>
        <button v-if="!contact.contactId" type="submit" @click="handleAdd">ADD CONTACT</button>
        <button v-else type="submit" @click="handleUpdate">UPDATE CONTACT</button>
      </label>
      
      <label>
        <button class="clear" type="reset">clear form</button>
      </label>
    </form>
   <img class="stripe" src="../assets/codestripe.png">
  </div>
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
          this.companies.push({ name: 'ADD NEW COMPANY', id:0 });
          this.companies.unshift ('');
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
  margin-top: 10%;
  text-align: center;
}

.comp-title {
  background-color:#39499B;
  color: #fff;
  height: 50px;
  margin-bottom: 10px;
}

.sub {
  font-family: 'Source Serif Pro', serif;
  font-weight: 400;
  color: #00AA8F;
  font-style: oblique;
  text-align: center;
  margin: 0px;
}

pre {
  font-family: 'Poppins', sans-serif;
  color:#FF7546; 
}

button {
  font-family: 'Poppins', sans-serif;
  font-weight: 700;
  letter-spacing: .2em;
  background-color: #FF7546;
  color: #fff;
  padding: 10px 10px;
  border: none;
  width: 180px;
}

button:active {
  background-color: #fff;
  color: #FF7546;
}

.clear {
  font-family: 'Poppins', sans-serif;
  font-weight: 700;
  color: #FF7546;
  letter-spacing: .2em;
  background-color: #FFF;
  border: solid 2px #FF7546 !important;
  margin: 10px;
  padding: 10px 10px;
  border: none;
  width: 180px;
}

.clear:active {
  background-color: rgba(255, 116, 70, 0.283);
}

input {
  margin-bottom: 8px;
  width: 200px;
  height: 20px;
  padding-left: 5px;
}

select {
  margin-bottom: 10px;
  width: 200px;
  height: 24px;
  border-radius: 0px;
  background-color: #fff;
}

label {
   font-family: 'Poppins', sans-serif;
   font-weight: 700;
   display: block;
   margin-top: 0px;
 } 

 .stripe {
  width: 100%;
}
</style>
