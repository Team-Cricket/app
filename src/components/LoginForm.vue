<template>
  <div>
    <h1>Login Form Component</h1>
    <button @click="type = isSignUp ? 'signIn': 'signUp'">
      {{ isSignUp
          ? "Have an account? Click here to sign in"
          : "Click here to sign up"
      }}
    </button>
  </div>
</template>

<script>
export default {
  

};
</script>

<style>

</style>
