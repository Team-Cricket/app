<template>
  <div>
    <img width="150px" src="https://res.cloudinary.com/hrscywv4p/image/upload/c_limit,fl_lossy,h_300,w_300,f_auto,q_auto/v1/983693/axmqlpjyo3zmeszdr9qt.png">
    <form @submit.prevent="handleSubmit">
      Email:<input v-model="credentials.email">
      <br>
      Password:<input
      :type="show ? 'text' : 'password'" 
      v-model="credentials.password">
      <br>
      <button type="button" @click="show = !show"
      >Show/Hide Password
      </button>
      <br>
      <button type="submit">
        {{ label }}
      </button>

      <p v-if="isSignUp">
        Have an account? Click <strong class="pointer" @click="type = isSignUp ? 'signIn' : 'signUp'">here</strong> to sign in!
      </p>

      <p v-else>
        New user? Click <strong class="pointer" @click="type = isSignUp ? 'signIn' : 'signUp'">here</strong> to sign up!
      </p>

    </form>
  </div>
</template>

<script>
import { signUp, signIn } from '../services/api';

export default {
  data() {
    return {
      credentials: {
        email: '',
        password: ''
      },
      show: false,
      type: 'signUp',
    };
  },

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
      const action = this.isSignUp ? signUp : signIn;
      action(this.credentials)
        .then(result => console.log(result))
        .catch(err => console.log(err));
    }
  }
};
</script>

<style scoped>
img {
  margin-top: 50px;
}
.pointer {
cursor: pointer;
}
input, button {
  margin: 10px;
}
button {
  font-size: 14px;
}
</style>
