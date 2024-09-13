<template>
    <div class="update-profile-container">
      <h1>Ažuriraj Profil</h1>
      
      <form @submit.prevent="updateProfile">
        <div class="form-group">
          <label for="ime">Ime:</label>
          <input type="text" id="ime" v-model="user.ime" required />
        </div>
        
        <div class="form-group">
          <label for="prezime">Prezime:</label>
          <input type="text" id="prezime" v-model="user.prezime" required />
        </div>
  
        <div class="form-group">
          <label for="visina">Visina (cm):</label>
          <input type="number" id="visina" v-model="user.visina" required />
        </div>
  
        <div class="form-group">
          <label for="kilaza">Kilaza (kg):</label>
          <input type="number" id="kilaza" v-model="user.kilaza" required />
        </div>
  
        <div class="form-group">
          <label for="zdrastveniProblemi">Zdravstveni Problemi:</label>
          <textarea id="zdrastveniProblemi" v-model="user.zdrastveniProblemi"></textarea>
        </div>
  
        <div class="form-group">
          <label for="slika">Profilna Slika:</label>
          <input type="file" id="slika" @change="onImageSelected" />
        </div>
  
        <button type="submit" class="btn btn-primary">Spremi Promjene</button>
      </form>
    </div>
  </template>
  
  <script>
  import axios from 'axios';
  
  export default {
    data() {
      return {
        user: {
          ime: '',
          prezime: '',
          visina: '',
          kilaza: '',
          zdrastveniProblemi: '',
          slika: ''
        },
        selectedImage: null
      };
    },
    async created() {
      try {
        const response = await axios.get('http://localhost:5000/api/users/profile', {
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`
          }
        });
        this.user = response.data;
      } catch (error) {
        console.error('Greška pri dohvaćanju profila:', error);
      }
    },
    methods: {
      onImageSelected(event) {
        this.selectedImage = event.target.files[0];
      },
      async updateProfile() {
        try {
          let formData = new FormData();
          formData.append('ime', this.user.ime);
          formData.append('prezime', this.user.prezime);
          formData.append('visina', this.user.visina);
          formData.append('kilaza', this.user.kilaza);
          formData.append('zdrastveniProblemi', this.user.zdrastveniProblemi);
  
          if (this.selectedImage) {
            formData.append('slika', this.selectedImage);
          }
  
          const response = await axios.put('http://localhost:5000/api/users/profile', formData, {
            headers: {
              'Authorization': `Bearer ${localStorage.getItem('token')}`,
              'Content-Type': 'multipart/form-data'
            }
          });
  
          console.log('Profil uspješno ažuriran:', response.data);
          this.$router.push('/profile'); // Preusmjeravanje na profil nakon ažuriranja
        } catch (error) {
          console.error('Greška pri ažuriranju profila:', error);
        }
      }
    }
  };
  </script>
  
  <style scoped>
  .update-profile-container {
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
  