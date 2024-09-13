<template>
    <div class="delete-workout">
      <h1>Obriši trening</h1>
      <p>Jeste li sigurni da želite obrisati ovaj trening?</p>
      <p><strong>Tip:</strong> {{ workout.type }}</p>
      <p><strong>Datum:</strong> {{ formatDate(workout.date) }}</p>
      <p><strong>Trajanje:</strong> {{ workout.duration }} minuta</p>
  
      <button @click="confirmDelete" class="btn btn-danger">Da, obriši</button>
      <button @click="cancelDelete" class="btn btn-secondary">Ne, odustani</button>
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
          duration: ''
        },
        workoutId: this.$route.params.id // Dohvati ID treninga iz rute
      };
    },
    async created() {
      try {
        // Dohvati podatke o treningu koji se briše
        const response = await axios.get(`http://localhost:5000/api/workouts/${this.workoutId}`, {
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`
          }
        });
        this.workout = response.data;
      } catch (error) {
        console.error('Greška pri dohvaćanju treninga:', error.message);
      }
    },
    methods: {
      async confirmDelete() {
        try {
          // Izvrši brisanje treninga na serveru
          await axios.delete(`http://localhost:5000/api/workouts/${this.workoutId}`, {
            headers: {
              'Authorization': `Bearer ${localStorage.getItem('token')}`
            }
          });
          // Preusmjeri natrag na listu treninga nakon uspješnog brisanja
          this.$router.push('/workouts');
        } catch (error) {
          console.error('Greška pri brisanju treninga:', error.message);
        }
      },
      cancelDelete() {
        // Vrati se na prethodnu stranicu bez brisanja
        this.$router.go(-1);
      },
      formatDate(value) {
        const date = new Date(value);
        return date.toLocaleDateString();
      }
    }
  };
  </script>
  
  <style scoped>
  .delete-workout {
    max-width: 500px;
    margin: 0 auto;
    padding: 20px;
    background-color: #f9f9f9;
    border-radius: 8px;
    box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);
    text-align: center;
  }
  
  .delete-workout h1 {
    margin-bottom: 20px;
  }
  
  .btn {
    margin: 10px;
    padding: 10px 20px;
    font-size: 16px;
  }
  </style>
  