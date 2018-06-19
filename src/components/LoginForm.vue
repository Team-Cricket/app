<template>
  <div>

    <img src="https://res.cloudinary.com/hrscywv4p/image/upload/c_limit,fl_lossy,h_300,w_300,f_auto,q_auto/v1/983693/axmqlpjyo3zmeszdr9qt.png">
    <button @click="type = isSignUp ? 'signIn': 'signUp'">
      {{ isSignUp
          ? "Have an account? Click here to sign in"
          : "Click here to sign up"
      }}
    </button>
    <form @submit.prevent="handleSubmit">
      <input
      :type="show ? 'text' : 'password'"
      v-model="credentials.email">

      <button
      @click="show = !show"
      type="button"
      >
        {{ show? 'Hide' : 'Show' }}
      </button>

      <button type="submit"
        {{ label }}
      >
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
      }
    };
  }
  
};
</script>

<style>

</style>
