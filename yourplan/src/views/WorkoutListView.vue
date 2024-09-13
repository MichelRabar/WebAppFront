<template>
    <div>
      <!-- Prikazivanje trener ID i korisničkog ID-a na vrhu stranice 
      <div class="trainer-id-display">
        <h2>Trener ID: {{ trenerid }}</h2>
      </div>-->
  
      <h1>Treninzi za odabranog trenera</h1>
      
      <!-- Prikazivanje svih treninga povezanih sa trenerom u karticama -->
      <div v-if="filteredWorkouts.length" class="workout-grid">
        <div class="workout-card" v-for="workout in filteredWorkouts" :key="workout._id">
          <p><strong>Datum:</strong> {{ formatDate(workout.date) }}</p>
          <p><strong>Tip:</strong> {{ workout.type }}</p>
          <p><strong>Trajanje:</strong> {{ workout.duration }} minuta</p>
          <p><strong>Opis:</strong> {{ workout.description || 'Nema opisa' }}</p>
  
          <!-- Gumbi za uređivanje i brisanje -->
          <!-- Gumbi će se prikazati samo ako se trainerId poklapa s userId -->
          <div v-if="workout.trainerId === userId">
            <button @click="editWorkout(workout._id)">Uredi</button>
            <button @click="deleteWorkout(workout._id)">Obriši</button>
          </div>
        </div>
      </div>
      <div v-else>
        <p>Nema treninga za odabranog trenera.</p>
      </div>
    </div>
  </template>
  
  <script>
  import axios from 'axios';
  
  export default {
    data() {
      return {
        workouts: [], // Svi dohvaćeni treninzi
        trenerid: null, // Trener ID koji ćemo dobiti iz localStorage
        userId: null, // ID korisnika (prijavljenog korisnika)
      };
    },
    computed: {
      // Filtriranje treninga po trener ID-u
      filteredWorkouts() {
        return this.workouts.filter(workout => workout.trainerId === this.trenerid);
      }
    },
    async created() {
      try {
        // Dohvaćanje trenerid i userId iz localStorage
        this.trenerid = localStorage.getItem('followedTrainerId');
        this.userId = localStorage.getItem('userId');
    
        if (this.trenerid) {
          // Ako je trenerid prisutan, dohvatite sve treninge
          const response = await axios.get('http://localhost:5000/api/workouts', {
            headers: {
              'Authorization': `Bearer ${localStorage.getItem('token')}`
            },
            params: { trainerId: this.trenerid } // Prosledi params u GET zahtev
          });
    
          // Spremajte sve treninge
          this.workouts = response.data;
        } else {
          console.warn('Nijedan trener nije odabran.');
        }
      } catch (error) {
        console.error('Greška pri dohvaćanju treninga:', error.message);
      }
    },
    methods: {
      formatDate(value) {
        const date = new Date(value);
        return date.toLocaleDateString();
      },
      // Metoda za uređivanje treninga
      editWorkout(workoutId) {
        this.$router.push({ path: `/edit-workout/${workoutId}` });
      },
      // Metoda za brisanje treninga
      async deleteWorkout(workoutId) {
        try {
          await axios.delete(`http://localhost:5000/api/workouts/${workoutId}`, {
            headers: {
              'Authorization': `Bearer ${localStorage.getItem('token')}`
            }
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
  .trainer-id-display {
    background-color: #f0f0f0;
    padding: 10px;
    border-bottom: 2px solid #ddd;
    text-align: center;
    margin-bottom: 20px;
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
  