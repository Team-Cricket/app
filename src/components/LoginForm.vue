<template>
  <div>

    <section id="header">
      <img class="key" src="../assets/alchemy-connect-logo.png">
    </section>

    <h1>ALCHEMY CONNECT</h1>
    <p class="sub">Make the most of your networking efforts</p>

    <span id="login-content" v-if="!user">
      <p id="login-error" v-if="error">
        {{ error }}
      </p>
      <p v-else>

      <form @submit.prevent="handleSubmit">
        <label>Email:</label>
        <input v-model="credentials.email">
        <br>
        <label>Password:</label>
        <input
        :type="show ? 'text' : 'password'" 
        v-model="credentials.password">
        <br>
        <button id="showhide" type="button" @click="show = !show"
        >Show/Hide Password
        </button>
        <br>
        <button type="submit">
          {{ label }}
        </button>

        <p v-if="isSignUp">
          Have an account? Click <strong @click="type = isSignUp ? 'signIn' : 'signUp'">here</strong> to sign in!
        </p>

        <p v-else>
          New user? Click <strong  @click="type = isSignUp ? 'signIn' : 'signUp'">here</strong> to sign up!
        </p>
      </form>
    </span>
    <img class="stripe" src="../assets/codestripe.png">

  </div>
</template>

<script>
import { signUp, signIn } from '../services/api';

const emailRegex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

export default {
  data() {
    return {
      credentials: {
        email: '',
        password: ''
      },
      show: false,
      type: 'signIn',
      error: null,
    };
  },
  props: ['onUser', 'user'],
  computed: {
    isSignUp() {
      return this.type === 'signUp';
    },
    label() {
      return this.isSignUp ? 'Sign Up' : 'Sign In';
    }
  },
  methods: {
    handleSubmit() {
      if(!emailRegex.test(this.credentials.email)) {
        this.error = 'Please enter a valid email address';
        return;
      }

      this.error = null;
      const action = this.isSignUp ? signUp : signIn;
      action(this.credentials)
        .then(user => {
          this.onUser(user);
          this.$router.push('/dashboard');
        })
        .catch(err => this.error = err);
    }
  }
};
</script>

<style scoped>

#header {
  background-color: #000;
}

h1 {
  margin: 2px;
  padding: 2px;
}

label {
   font-family: 'Poppins', sans-serif;
   font-weight: 700;
 }

.sub {
  font-family: 'Source Serif Pro', serif;
  font-weight: 400;
  color: #00AA8F;
  font-style: oblique;
  margin: 0;
}

#showhide {
  font-family: 'Poppins', sans-serif;
  color: #999;
  font-size: .8em;
}

#login-error {
  font-family: 'Poppins', sans-serif;
  color: #FF7546;
}

.key {
  margin-top: 10px;
  width: 50%;
}


.stripe {
  width: 100%;
}

input, button {
  margin: 10px;
}

button {
  font-size: 14px;
}
</style>
