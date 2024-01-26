<template>
    <div>
      <h2>Sign Up</h2>
      <form @submit.prevent="signupUser">
        <label for="username">Username:</label>
        <input type="text" v-model="username" required />
        
        <label for="password">Password:</label>
        <input type="password" v-model="password" required />
  
        <button type="submit">Sign Up</button>
      </form>
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        username: '',
        password: ''
      };
    },
    methods: {
      signupUser() {
       
        console.log('Registriran korisnik:', this.username);
      }
    }
  };
  </script>
  