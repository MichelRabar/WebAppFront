<template>
    <div class="workout-container">
      <h1>Dodajte Trening</h1>
      <!-- Forma za dodavanje treninga -->
      <form @submit.prevent="addWorkout" class="workout-form">
        <div class="form-group">
          <label for="date">Datum:</label>
          <input v-model="date" id="date" type="date" required />
        </div>
  
        <div class="form-group">
          <label for="type">Tip:</label>
          <input v-model="type" id="type" type="text" placeholder="Unesite tip treninga" required />
        </div>
  
        <div class="form-group">
          <label for="duration">Trajanje (minuta):</label>
          <input v-model="duration" id="duration" type="number" placeholder="Unesite trajanje u minutama" required />
        </div>
  
        <div class="form-group">
          <label for="description">Opis:</label>
          <textarea v-model="description" id="description" placeholder="Unesite opis treninga"></textarea>
        </div>
  <!-- 
      <div class="form-group">
          <label for="trainerId">Trainer ID:</label>
          <input v-model="trainerId" id="trainerId" type="text" placeholder="Unesite ID trenera" required />
        </div>
  -->
        <button type="submit" class="submit-button">Dodaj trening</button>
      </form>
    </div>
  </template>
  
  <script>
  import axios from 'axios';
  
  export default {
    data() {
      return {
        date: '',
        type: '',
        duration: '',
        description: '',
        trainerId: '' // Polje za čuvanje ID-a trenera
      };
    },
    async created() {
      try {
        // Učitavanje podataka o korisniku
        const response = await axios.get('http://localhost:5000/api/users/profile', {
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`
          }
        });
        // Postavite ID trenera iz učitanih podataka
        this.trainerId = response.data._id; // Pretpostavka da se ID trenera nalazi u response.data._id
      } catch (error) {
        console.error('Greška pri dohvaćanju ID-a trenera:', error.message);
      }
    },
    methods: {
      async addWorkout() {
        try {
          const workoutData = {
            date: this.date,
            type: this.type,
            duration: this.duration,
            description: this.description,
            trainerId: this.trainerId // Sada koristimo ID trenera
          };
  
          console.log('Podaci koji se šalju:', workoutData); // Provjera svih poslanih podataka
  
          const response = await axios.post('http://localhost:5000/api/workouts', workoutData, {
            headers: {
              'Authorization': `Bearer ${localStorage.getItem('token')}`
            }
          });
          console.log('Trening je uspešno dodat:', response.data);
  
          // Reset forme nakon uspešnog dodavanja
          this.date = '';
          this.type = '';
          this.duration = '';
          this.description = '';
        } catch (error) {
          console.error('Greška pri dodavanju treninga:', error.message);
        }
      }
    }
  };
  </script>
  
  <style scoped>
  .workout-container {
    max-width: 600px;
    margin: 50px auto;
    padding: 20px;
    background-color: #f4f4f4;
    border-radius: 8px;
    box-shadow: 0 0 15px rgba(0, 0, 0, 0.1);
  }
  
  h1 {
    text-align: center;
    margin-bottom: 20px;
    color: #333;
  }
  
  .workout-form {
    display: flex;
    flex-direction: column;
  }
  
  .form-group {
    margin-bottom: 15px;
  }
  
  .form-group label {
    display: block;
    margin-bottom: 5px;
    font-weight: bold;
    color: #333;
  }
  
  .form-group input,
  .form-group textarea {
    width: 100%;
    padding: 10px;
    font-size: 16px;
    border: 1px solid #ccc;
    border-radius: 4px;
    box-sizing: border-box;
  }
  
  .submit-button {
    padding: 10px 20px;
    font-size: 18px;
    color: #fff;
    background-color: #007bff;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    text-align: center;
    transition: background-color 0.3s ease;
    margin-top: 20px;
  }
  
  .submit-button:hover {
    background-color: #0056b3;
  }
  </style>
  