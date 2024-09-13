<template>
    <div class="meal-container">
      <h1>Dodajte Obrok</h1>
      <!-- Prikaz obroka -->
      <form @submit.prevent="addMeal" class="meal-form">
        <div class="form-group">
          <label for="date">Datum:</label>
          <input v-model="date" id="date" type="date" required />
        </div>
  
        <div class="form-group">
          <label for="breakfast">Doručak:</label>
          <input v-model="breakfast" id="breakfast" type="text" placeholder="Unesite doručak" required />
        </div>
  
        <div class="form-group">
          <label for="lunch">Ručak:</label>
          <input v-model="lunch" id="lunch" type="text" placeholder="Unesite ručak" required />
        </div>
  
        <div class="form-group">
          <label for="dinner">Večera:</label>
          <input v-model="dinner" id="dinner" type="text" placeholder="Unesite večeru" required />
        </div>
  
        <button type="submit" class="submit-button">Dodaj obrok</button>
      </form>
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
        userid: '' // Polje za čuvanje korisničkog ID-a
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
        // Postavite korisnički ID iz učitanih podataka o korisniku
        this.userid = response.data._id; // Pretpostavka da se korisnički ID nalazi u response.data._id
      } catch (error) {
        console.error('Greška pri dohvaćanju korisničkog ID-a:', error.message);
      }
    },
    methods: {
      async addMeal() {
        try {
          const mealData = {
            date: this.date,
            breakfast: this.breakfast,
            lunch: this.lunch,
            dinner: this.dinner,
            trenerid: this.userid // Sada koristimo korisnički ID
          };
          
          console.log('Podaci koji se šalju:', mealData); // Provjera svih poslanih podataka
  
          const response = await axios.post('http://localhost:5000/api/meals', mealData, {
            headers: {
              'Authorization': `Bearer ${localStorage.getItem('token')}`
            }
          });
          console.log('Obrok je uspešno dodan:', response.data);
          
          // Reset forme nakon uspešnog dodavanja
          this.date = '';
          this.breakfast = '';
          this.lunch = '';
          this.dinner = '';
        } catch (error) {
          console.error('Greška pri dodavanju obroka:', error.message);
        }
      }
    }
  };
  </script>
  
  <style scoped>
  .meal-container {
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
  
  .meal-form {
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
  
  .form-group input {
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
  