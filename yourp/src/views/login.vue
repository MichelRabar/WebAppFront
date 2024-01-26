<template>
    <div>
      <h2>Login</h2>
      <form @submit.prevent="loginUser">
        <label for="username">Username:</label>
        <input type="text" v-model="username" required />
        
        <label for="password">Password:</label>
        <input type="password" v-model="password" required />
  
        <button type="submit">Login</button>
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
      loginUser() {
        // Ovdje dodajte logiku za prijavu korisnika
        console.log('Prijavljen korisnik:', this.username);
      }
    }
  };
  </script>
  