<template>
  <div>
    <!-- 
    <div class="trainer-id-display">
      <h2>Trener ID: {{ trenerid }}</h2>
    </div> -->

    <h1>Obroci za odabranog trenera</h1>
    
    <!-- Prikazivanje svih obroka povezanih sa trenerom u karticama -->
    <div v-if="meals.length" class="meal-grid">
      <div class="meal-card" v-for="meal in meals" :key="meal._id">
        <p><strong>Datum:</strong> {{ formatDate(meal.date) }}</p>
        <p><strong>Doručak:</strong> {{ meal.breakfast }}</p>
        <p><strong>Ručak:</strong> {{ meal.lunch }}</p>
        <p><strong>Večera:</strong> {{ meal.dinner }}</p>
      </div>
    </div>
    <div v-else>
      <p>Nema obroka za odabranog trenera.</p>
    </div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      meals: [],
      trenerid: null // Trener ID koji ćemo dobiti iz localStorage
    };
  },
  async created() {
    try {
      // Dohvaćanje trenerid iz localStorage
      this.trenerid = localStorage.getItem('followedTrainerId'); // Ovde koristimo trenerid

      if (this.trenerid) {
        // Ako je trenerid prisutan, dohvatite sve obroke za tog trenera
        const response = await axios.get(`http://localhost:5000/api/meals?trenerid=${this.trenerid}`); // Uveravamo se da je trenerid u query parametru
        this.meals = response.data;
      } else {
        console.warn('Nijedan trener nije odabran.');
      }
    } catch (error) {
      console.error('Greška pri dohvaćanju obroka:', error.message);
    }
  },
  methods: {
    formatDate(value) {
      const date = new Date(value);
      return date.toLocaleDateString();
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
</style>
