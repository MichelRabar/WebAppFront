<template>
    <div class="meal-view">
      <h2>Profil Korisnika i Dodaj Obrok</h2>
      
      <!-- Prikaz podataka o korisniku -->
      <div v-if="user">
        <h3>Podaci o meni</h3>
        <p><strong>Ime:</strong> {{ user.ime }}</p>
        <p><strong>Prezime:</strong> {{ user.prezime }}</p>
        <p><strong>Visina:</strong> {{ user.visina }} cm</p>
        <p><strong>Kilaza:</strong> {{ user.kilaza }} kg</p>
        <p><strong>Zdravstveni problemi:</strong> {{ user.zdrastveniProblemi }}</p>
        <p><strong>Username:</strong> {{ user.username }}</p>
        <p><strong>Slika:</strong> <img :src="user.slika" alt="User Image" width="100" v-if="user.slika" /></p>
      </div>
      
      <!-- Forma za unos obroka -->
      <div class="meal-form">
        <h3>Dodajte obrok</h3>
        <form @submit.prevent="addMeal">
          <input v-model="date" type="date" required />
          <input v-model="breakfast" type="text" placeholder="Doručak" required />
          <input v-model="lunch" type="text" placeholder="Ručak" required />
          <input v-model="dinner" type="text" placeholder="Večera" required />
          <button type="submit">Dodaj obrok</button>
        </form>
      </div>
    </div>
  </template>
  
  <script>
  import axios from 'axios';
  
  export default {
    data() {
      return {
        date: '',
        breakfast: '',
        lunch: '',
        dinner: '',
        user: null,
        trenerId: '', // Ovdje će biti popunjeno automatski
      };
    },
    async created() {
      try {
        const token = localStorage.getItem('token'); // Dohvati token iz localStorage
  
        if (!token) {
          console.error('Token nije pronađen');
          return;
        }
  
        // Dohvati podatke o korisniku
        const response = await axios.get('http://localhost:5000/api/profile', {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
  
        this.user = response.data;
        this.trenerId = response.data.trenerId || ''; // Postavi trenerId ako je dostupan
      } catch (error) {
        console.error('Greška pri dohvaćanju profila:', error.message);
      }
    },
    methods: {
      async addMeal() {
        try {
          const response = await axios.post('http://localhost:5000/api/meals', {
            date: this.date,
            breakfast: this.breakfast,
            lunch: this.lunch,
            dinner: this.dinner,
            trenerId: this.trenerId, // Poslati trenerId zajedno sa podacima obroka
          });
          console.log('Obrok je uspješno dodan:', response.data);
          // Reset formi nakon uspešnog dodavanja
          this.date = '';
          this.breakfast = '';
          this.lunch = '';
          this.dinner = '';
        } catch (error) {
          console.error('Greška pri dodavanju obroka:', error.message);
        }
      },
    },
  };
  </script>
  
  <style scoped>
  .meal-view {
    padding: 20px;
  }
  
  .meal-view h2 {
    margin-bottom: 20px;
  }
  
  .meal-view img {
    border-radius: 50%;
    max-width: 100px;
  }
  
  .meal-view p {
    font-size: 16px;
    margin: 10px 0;
  }
  
  .meal-form {
    margin-top: 20px;
  }
  
  .meal-form form {
    display: flex;
    flex-direction: column;
  }
  
  .meal-form input {
    margin-bottom: 10px;
    padding: 10px;
  }
  
  .meal-form button {
    padding: 10px;
    background-color: #42b983;
    color: white;
    border: none;
    cursor: pointer;
  }
  </style>
  