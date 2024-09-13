<template>
    <div>
      <!-- 
      <div class="user-id">
        <p><strong>Korisnički ID:</strong> {{ userId }}</p>
      </div>-->
  
      <h1>Moji treninzi</h1>
      
      <!-- Prikazivanje svih treninga korisnika u karticama -->
      <div v-if="workouts.length" class="workout-grid">
        <div class="workout-card" v-for="workout in workouts" :key="workout._id">
          <p><strong>Datum:</strong> {{ formatDate(workout.date) }}</p>
          <p><strong>Tip:</strong> {{ workout.type }}</p>
          <p><strong>Trajanje:</strong> {{ workout.duration }} minuta</p>
          <p><strong>Opis:</strong> {{ workout.description || 'Nema opisa' }}</p>
  
          <!-- Gumbi za uređivanje i brisanje -->
          <button @click="editWorkout(workout._id)">Uredi</button>
          <button @click="deleteWorkout(workout._id)">Obriši</button>
        </div>
      </div>
      <div v-else>
        <p>Niste još kreirali nijedan trening.</p>
      </div>
    </div>
  </template>
  
  <script>
  import axios from 'axios';
  
  export default {
    data() {
      return {
        userId: '', // ID korisnika
        workouts: [], // Svi dohvaćeni treninzi korisnika
      };
    },
    async created() {
      try {
        // Dohvati korisnički ID s API poziva
        const userResponse = await axios.get('http://localhost:5000/api/users/profile', {
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`
          }
        });
        this.userId = userResponse.data._id; // Postavite korisnički ID
  
        // Dohvati treninge za korisnika
        const workoutResponse = await axios.get('http://localhost:5000/api/workouts', {
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`
          },
          params: { trainerId: this.userId } // Filtriraj treninge po korisničkom ID-u
        });
        this.workouts = workoutResponse.data;
      } catch (error) {
        console.error('Greška pri dohvaćanju treninga:', error.message);
      }
    },
    methods: {
      formatDate(value) {
        const date = new Date(value);
        return date.toLocaleDateString();
      },
      editWorkout(workoutId) {
        this.$router.push({ path: `/edit-workout/${workoutId}` });
      },
      async deleteWorkout(workoutId) {
        try {
          await axios.delete(`http://localhost:5000/api/workouts/${workoutId}`, {
            headers: {
              'Authorization': `Bearer ${localStorage.getItem('token')}`
            },
            data: { userId: this.userId } // Slanje ID korisnika za potvrdu brisanja
          });
          // Filtrirajte obrisani trening iz liste
          this.workouts = this.workouts.filter(workout => workout._id !== workoutId);
        } catch (error) {
          console.error('Greška pri brisanju treninga:', error.message);
        }
      }
    }
  };
  </script>
  
  <style scoped>
  .user-id {
    margin-bottom: 20px; /* Razmak ispod ID-a korisnika */
    font-size: 18px;
    color: #555;
  }
  
  .workout-grid {
    display: grid;
    grid-template-columns: repeat(3, 1fr); /* 3 kolone u retku */
    gap: 20px; /* Razmak između kartica */
  }
  
  .workout-card {
    background-color: #f9f9f9;
    padding: 20px;
    border-radius: 8px;
    border: 2px solid #ffc107; /* Žuti obrub */
    box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);
    text-align: center;
  }
  
  .workout-card p {
    margin: 5px 0;
    font-size: 16px;
    color: #333;
  }
  
  .workout-card button {
    margin: 5px;
    padding: 8px 12px;
    font-size: 14px;
    cursor: pointer;
    border: none;
    border-radius: 5px;
  }
  
  .workout-card button:hover {
    background-color: #ddd;
  }
  </style>
  