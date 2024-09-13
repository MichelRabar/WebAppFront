<template>
  <div class="container mt-5">
    <h1 class="text-center mb-4">Registracija</h1>
    <div class="form-wrapper">
      <form @submit.prevent="registerUser" class="form-group">
        <div class="row">
          <div class="col-md-6 mb-3">
            <input v-model="formData.ime" type="text" class="form-control" placeholder="Ime" />
          </div>
          <div class="col-md-6 mb-3">
            <input v-model="formData.prezime" type="text" class="form-control" placeholder="Prezime" />
          </div>
        </div>
        <div class="row">
          <div class="col-md-6 mb-3">
            <input v-model="formData.visina" type="number" class="form-control" placeholder="Visina (cm)" />
          </div>
          <div class="col-md-6 mb-3">
            <input v-model="formData.kilaza" type="number" class="form-control" placeholder="Kilaza (kg)" />
          </div>
        </div>
        <div class="mb-3">
          <input v-model="formData.zdrastveniProblemi" type="text" class="form-control" placeholder="Zdravstveni Problemi" />
        </div>
        <div class="mb-3">
          <input v-model="formData.lozinka" type="password" class="form-control" placeholder="Lozinka" />
        </div>
        <div class="mb-3">
          <input v-model="formData.username" type="text" class="form-control" placeholder="Username" />
        </div>
        <div class="mb-3">
          <input type="file" @change="handleFileUpload" class="form-control-file" />
        </div>
        <button type="submit" class="btn btn-primary btn-block">Registruj se</button>
        <p v-if="error" class="text-danger mt-3">{{ error }}</p>
      </form>
    </div>
  </div>
</template>

<script>
import axios from 'axios';
import router from '@/router'; // Importujte router ako koristite Vue Router

export default {
  data() {
    return {
      formData: {
        ime: '',
        prezime: '',
        visina: '',
        kilaza: '',
        zdrastveniProblemi: '',
        lozinka: '',
        username: '',
        jeTrener: false
      },
      file: null,
      error: null
    };
  },
  methods: {
    handleFileUpload(event) {
      this.file = event.target.files[0];
    },
    async registerUser() {
      const formData = new FormData();
      for (const key in this.formData) {
        formData.append(key, this.formData[key]);
      }
      if (this.file) {
        formData.append('slika', this.file);
      }

      try {
        // Prvi deo - registracija korisnika
        await axios.post('http://localhost:5000/api/users/register', formData, {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        });

        // Drugi deo - automatsko prijavljivanje nakon registracije
        const loginData = {
          username: this.formData.username,
          lozinka: this.formData.lozinka
        };
        
        const response = await axios.post('http://localhost:5000/api/users/login', loginData);

        // Spremanje tokena u localStorage
        localStorage.setItem('token', response.data.token);

        // Usmeravanje na početnu stranicu ili drugu stranicu
        router.push('/');

      } catch (error) {
        this.error = 'Greška pri registraciji korisnika.';
        console.error('Greška pri registraciji ili prijavi:', error.message);
      }
    }
  }
};
</script>
