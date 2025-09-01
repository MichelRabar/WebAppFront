<template>
    <div class="logout">
      <h2>Odjava</h2>
      <p>Da li ste sigurni da želite da se odjavite?</p>
      <button @click="logout">Odjavi se</button>
    </div>
  </template>
  
  <script>
  export default {
    name: 'UserLogout',
    methods: {
      logout() {
        // Obrisi token iz localStorage
        localStorage.removeItem('token');
  
        // Preusmjeri korisnika na stranicu za prijavu ili početnu stranu
        this.$router.push('/login');
      }
    }
  };
  </script>
  
  <style scoped>
  
  </style>
  