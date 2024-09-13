<template>
    <div class="edit-workout">
      <h1>Ažuriraj Trening</h1>
      <form @submit.prevent="updateWorkout">
        <div class="form-group">
          <label for="date">Datum:</label>
          <input type="date" id="date" v-model="workout.date" required />
        </div>
  
        <div class="form-group">
          <label for="type">Tip treninga:</label>
          <input type="text" id="type" v-model="workout.type" required />
        </div>
  
        <div class="form-group">
          <label for="duration">Trajanje (u minutama):</label>
          <input type="number" id="duration" v-model="workout.duration" required />
        </div>
  
        <div class="form-group">
          <label for="description">Opis:</label>
          <textarea id="description" v-model="workout.description"></textarea>
        </div>
  
        <button type="submit" class="btn btn-primary">Spremi izmjene</button>
      </form>
    </div>
  </template>
  
  <script>
  import axios from 'axios';
  
  export default {
    data() {
      return {
        workout: {
          date: '',
          type: '',
          duration: '',
          description: ''
        }
      };
    },
    async created() {
      try {
        const response = await axios.get(`http://localhost:5000/api/workouts/${this.$route.params.id}`, {
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`
          }
        });
        this.workout = response.data;
      } catch (error) {
        console.error('Greška pri dohvaćanju treninga:', error);
      }
    },
    methods: {
      async updateWorkout() {
        try {
          const response = await axios.put(`http://localhost:5000/api/workouts/${this.$route.params.id}`, this.workout, {
            headers: {
              'Authorization': `Bearer ${localStorage.getItem('token')}`,
              'Content-Type': 'application/json'
            }
          });
  
          console.log('Trening uspješno ažuriran:', response.data);
          this.$router.push('/workouts'); // Preusmjeravanje na listu treninga nakon ažuriranja
        } catch (error) {
          console.error('Greška pri ažuriranju treninga:', error);
        }
      }
    }
  };
  </script>
  
  <style scoped>
  .edit-workout {
    max-width: 600px;
    margin: 0 auto;
    padding: 20px;
    background-color: #f9f9f9;
    border-radius: 8px;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  }
  
  .form-group {
    margin-bottom: 15px;
  }
  
  .form-group label {
    display: block;
    margin-bottom: 5px;
    font-weight: bold;
  }
  
  .form-group input,
  .form-group textarea {
    width: 100%;
    padding: 8px;
    box-sizing: border-box;
    border-radius: 4px;
    border: 1px solid #ccc;
  }
  
  .btn-primary {
    background-color: #007bff;
    border-color: #007bff;
    color: white;
    padding: 10px 20px;
    border-radius: 4px;
    cursor: pointer;
  }
  
  .btn-primary:hover {
    background-color: #0056b3;
  }
  </style>
  