<template>
  <div class="profile-container">
    <h1>Profil Korisnika</h1>
    
    <div class="profile-info">
      <img :src="userImage" alt="Profilna Slika" v-if="userImage" class="profile-image"/>
      
      <div class="profile-details">
        <p><strong>Ime:</strong> {{ user.ime }}</p>
        <p><strong>Prezime:</strong> {{ user.prezime }}</p>
        <p><strong>Visina:</strong> {{ user.visina }} cm</p>
        <p><strong>Kilaža:</strong> {{ user.kilaza }} kg</p>
        <p><strong>Zdravstveni Problemi:</strong> {{ user.zdrastveniProblemi }}</p>
      </div>
    </div>
    
    <button class="update-button" @click="goToUpdateProfile">Ažuriraj Profil</button>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      user: {},
      userImage: ''
    };
  },
  async created() {
    try {
      const response = await axios.get('http://localhost:5000/api/users/profile', {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}` // Pretpostavljamo da koristite token za autentifikaciju
        }
      });
      this.user = response.data;
      if (this.user.slika) {
        this.userImage = `http://localhost:5000/${this.user.slika.split('/').pop()}`;
      }
    } catch (error) {
      console.error('Greška pri učitavanju profila:', error);
    }
  },
  methods: {
    goToUpdateProfile() {
      this.$router.push('/update-profile'); // Pretpostavljamo da je ovo ruta za ažuriranje profila
    }
  }
};
</script>

<style scoped>
.profile-container {
  max-width: 800px;
  margin: 50px auto; /* Dodata top margina */
  padding: 20px;
  background-color: #f9f9f9;
  border-radius: 8px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
}

.profile-info {
  display: flex;
  align-items: center;
  margin-bottom: 20px;
}

.profile-image {
  width: 200px;
  height: 200px;
  border-radius: 50%;
  margin-right: 30px;
  object-fit: cover;
  border: 2px solid #ddd;
}

.profile-details {
  margin-left: 40px; /* Pomeranje podataka udesno */
}

.profile-details p {
  margin: 10px 0;
  font-size: 30px; /* Povećan font */
  color: #333;
  align-items: left;
}

.update-button {
  display: inline-block;
  padding: 10px 20px;
  font-size: 16px;
  color: #fff;
  background-color: #007bff;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  text-align: center;
}

.update-button:hover {
  background-color: #0056b3;
}
</style>
