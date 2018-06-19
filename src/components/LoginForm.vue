<template>
  <div>
    <img width=" 200px" src="https://res.cloudinary.com/hrscywv4p/image/upload/c_limit,fl_lossy,h_300,w_300,f_auto,q_auto/v1/983693/axmqlpjyo3zmeszdr9qt.png">
    <br>
    <button>
      Sign In? Sign Up?
    </button>
    <form>
      <br>
      <input v-model="credentials.email">
      <br>
      <button
      type="button"
      >Show/Hide Password
      </button>
      <br>
      <button type="submit"
      >Log In/Sign Up
      </button>
    </form>

  </div>
</template>

<script>

export default {
  data() {
    return {
      credentials: {
        email: '',
        password: ''
      },

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

<style>


</style>
