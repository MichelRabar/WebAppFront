<template>
    <div>
      <!-- 
      <div class="user-id">
        <p><strong>Korisnički ID:</strong> {{ userId }}</p>
      </div>-->
  
      <h1>Moji Obroci</h1>
  
      <!-- Prikazivanje svih obroka korisnika u karticama -->
      <div v-if="meals.length" class="meal-grid">
        <div class="meal-card" v-for="meal in meals" :key="meal._id">
          <p><strong>Datum:</strong> {{ formatDate(meal.date) }}</p>
          <p><strong>Doručak:</strong> {{ meal.breakfast }}</p>
          <p><strong>Ručak:</strong> {{ meal.lunch }}</p>
          <p><strong>Večera:</strong> {{ meal.dinner }}</p>
  
          <!-- Gumbi za uređivanje i brisanje -->
          <button @click="editMeal(meal._id)">Uredi</button>
          <button @click="deleteMeal(meal._id)">Obriši</button>
        </div>
      </div>
      <div v-else>
        <p>Niste još kreirali nijedan obrok.</p>
      </div>
    </div>
  </template>
  
  <script>
  import axios from 'axios';
  
  export default {
    data() {
      return {
        userId: '', // ID korisnika
        meals: [], // Svi dohvaćeni obroci korisnika
      };
    },
    async created() {
      try {
        // Dohvati korisnički ID s API poziva
        const token = localStorage.getItem('token');
        if (token) {
          // Pretpostavljamo da imate API koji vraća korisničke podatke
          const userResponse = await axios.get('http://localhost:5000/api/users/profile', {
            headers: {
              'Authorization': `Bearer ${token}`
            }
          });
          this.userId = userResponse.data._id; // Postavite korisnički ID
  
          // Dohvati obroke za korisnika
          const mealResponse = await axios.get('http://localhost:5000/api/meals', {
            headers: {
              'Authorization': `Bearer ${token}`
            },
            params: { trenerid: this.userId } // Filtriraj obroke po korisničkom ID-u
          });
          this.meals = mealResponse.data;
        }
      } catch (error) {
        console.error('Greška pri dohvaćanju obroka:', error.message);
      }
    },
    methods: {
      formatDate(value) {
        const date = new Date(value);
        return date.toLocaleDateString();
      },
      editMeal(mealId) {
        this.$router.push({ path: `/meals/edit/${mealId}` });
      },
      async deleteMeal(mealId) {
        try {
          const token = localStorage.getItem('token');
          await axios.delete(`http://localhost:5000/api/meals/${mealId}`, {
            headers: {
              'Authorization': `Bearer ${token}`
            },
            data: { userId: this.userId } // Slanje ID korisnika za potvrdu brisanja
          });
          // Filtrirajte obrisani obrok iz liste
          this.meals = this.meals.filter(meal => meal._id !== mealId);
        } catch (error) {
          console.error('Greška pri brisanju obroka:', error.message);
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
  
  .meal-grid {
    display: grid;
    grid-template-columns: repeat(3, 1fr); /* 3 kolone u retku */
    gap: 20px; /* Razmak između kartica */
  }
  
  .meal-card {
    background-color: #f9f9f9;
    padding: 20px;
    border-radius: 8px;
    border: 2px solid yellow; /* Žuti obrub */
    box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);
    text-align: center;
  }
  
  .meal-card p {
    margin: 5px 0;
    font-size: 16px;
    color: #333;
  }
  
  .meal-card button {
    margin: 5px;
    padding: 8px 12px;
    font-size: 14px;
    cursor: pointer;
    border: none;
    border-radius: 5px;
  }
  
  .meal-card button:hover {
    background-color: #ddd;
    
 }
  </style>
  