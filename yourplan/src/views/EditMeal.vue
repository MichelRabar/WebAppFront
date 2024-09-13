<template>
    <div class="edit-meal">
      <h1>Ažuriraj Obrok</h1>
      <form @submit.prevent="updateMeal">
        <div class="form-group">
          <label for="date">Datum:</label>
          <input type="date" id="date" v-model="meal.date" required />
        </div>
  
        <div class="form-group">
          <label for="breakfast">Doručak:</label>
          <input type="text" id="breakfast" v-model="meal.breakfast" required />
        </div>
  
        <div class="form-group">
          <label for="lunch">Ručak:</label>
          <input type="text" id="lunch" v-model="meal.lunch" required />
        </div>
  
        <div class="form-group">
          <label for="dinner">Večera:</label>
          <input type="text" id="dinner" v-model="meal.dinner" required />
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
        meal: {
          date: '',
          breakfast: '',
          lunch: '',
          dinner: ''
        }
      };
    },
    async created() {
      try {
        const response = await axios.get(`http://localhost:5000/api/meals/${this.$route.params.id}`, {
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`
          }
        });
        this.meal = response.data;
      } catch (error) {
        console.error('Greška pri dohvaćanju obroka:', error);
      }
    },
    methods: {
      async updateMeal() {
        try {
          const response = await axios.put(`http://localhost:5000/api/meals/${this.$route.params.id}`, this.meal, {
            headers: {
              'Authorization': `Bearer ${localStorage.getItem('token')}`,
              'Content-Type': 'application/json'
            }
          });
  
          console.log('Obrok uspješno ažuriran:', response.data);
          this.$router.push('/mymeals'); // Preusmjeravanje na listu obroka nakon ažuriranja
        } catch (error) {
          console.error('Greška pri ažuriranju obroka:', error);
        }
      }
    }
  };
  </script>
  
  <style scoped>
  .edit-meal {
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
  
  .form-group input {
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
  