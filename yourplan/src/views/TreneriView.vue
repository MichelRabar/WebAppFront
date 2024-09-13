<template>
  <div class="trainers-container">
    <h2 class="trainers-title">Naši treneri</h2>
    <div v-if="trainers.length === 0" class="no-trainers">
      Nema dostupnih trenera.
    </div>
    <div class="trainers-grid">
      <div class="trainer" v-for="trainer in trainers" :key="trainer._id">
        <img 
          :src="`http://localhost:5000/${trainer.slika}`" 
          :alt="trainer.ime" 
          class="trainer-image" 
        />
        <div class="trainer-info">
          <h3>{{ trainer.ime }} {{ trainer.prezime }}</h3>
          <p><strong>Iskustvo:</strong> {{ trainer.iskustvo }} godine</p>
          <p><strong>Specijalnost:</strong> {{ trainer.trenerid }}</p>
          <button 
            class="follow-button" 
            @click="followTrainer(trainer._id)"
          >
            {{ followedTrainerId === trainer._id ? 'Zapraćeno' : 'Prati me' }}
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      trainers: [],
      followedTrainerId: null
    };
  },
  async created() {
    try {
      // Učitavanje korisnika iz baze podataka i filtriranje trenera
      const response = await axios.get('http://localhost:5000/api/users/trainers');
      this.trainers = response.data.filter(trainer => trainer.jeTrener);

      // Učitavanje informacije o zapraćenom treneru iz localStorage
      const storedTrainerId = localStorage.getItem('followedTrainerId');
      if (storedTrainerId) {
        this.followedTrainerId = storedTrainerId;
      }
    } catch (error) {
      console.error('Greška pri učitavanju trenera:', error);
    }
  },
  methods: {
    followTrainer(trainerId) {
      if (this.followedTrainerId === trainerId) {
        // Ako korisnik klikne na trenera kojeg već prati, otpratiti ga
        this.followedTrainerId = null;
        localStorage.removeItem('followedTrainerId');
      } else {
        // Ako korisnik klikne na drugog trenera, zapratiti tog trenera
        this.followedTrainerId = trainerId;
        localStorage.setItem('followedTrainerId', trainerId);
      }
    }
  }
};
</script>

<style scoped>
.trainers-container {
  margin-top: 20px;
  text-align: center;
}

.trainers-title {
  font-size: 28px;
  margin-bottom: 30px;
  font-weight: bold;
  color: #333;
}

.trainers-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 20px;
  justify-items: center;
}

.trainer {
  background-color: #f9f9f9;
  padding: 15px;
  border-radius: 8px;
  border: 2px solid yellow;
  box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.1);
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  width: 250px;
}

.trainer-image {
  width: 120px;
  height: 120px;
  object-fit: cover;
  margin-bottom: 15px;
  border-radius: 50%;
  border: 2px solid #ddd;
}

.trainer-info {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.trainer-info h3 {
  margin: 0;
  font-size: 22px;
  color: #333;
}

.trainer-info p {
  margin: 5px 0 0;
  color: #666;
}

.follow-button {
  margin-top: 10px;
  padding: 8px 15px;
  background-color: #ffcc00;
  border: none;
  border-radius: 5px;
  color: #333;
  font-weight: bold;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.follow-button:disabled {
  background-color: #ddd;
  cursor: not-allowed;
}

.follow-button:hover:not(:disabled) {
  background-color: #ffdb4d;
}

.no-trainers {
  font-size: 18px;
  color: #666;
  text-align: center;
  width: 100%;
}
</style>
