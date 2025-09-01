<template>
  <div class="login-container">
    <h2 class="text-center">Prijava</h2>
    <form @submit.prevent="login" class="login-form">
      <div class="form-group">
        <label for="username">Username:</label>
        <input v-model="form.username" id="username" type="text" class="form-control" required />
      </div>
      <div class="form-group">
        <label for="lozinka">Lozinka:</label>
        <input v-model="form.lozinka" id="lozinka" type="password" class="form-control" required />
      </div>
      <button type="submit" class="btn btn-primary btn-block">Prijavi se</button>
    </form>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      form: {
        username: '',
        lozinka: ''
      }
    };
  },
  methods: {
    async login() {
      try {
        const response = await axios.post('http://localhost:5000/api/users/login', this.form);
        localStorage.setItem('token', response.data.token); // Čuvanje JWT tokena
        alert('Prijava uspešna');
        this.$router.push('/profile'); // Preusmjeravanje na profil ili neku drugu stranicu
      } catch (error) {
        console.error('Greška pri prijavi:', error);
        alert('Greška pri prijavi');
      }
    }
  }
};
</script>

<style scoped>
.login-container {
  max-width: 400px;
  margin: 0 auto;
  padding: 20px;
  background-color: #fff;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

.login-form {
  display: flex;
  flex-direction: column;
}

.form-group {
  margin-bottom: 15px;
}

.form-control {
  border-radius: 4px;
  border: 1px solid #ced4da;
  padding: 10px;
}

.btn-primary {
  background-color: #007bff;
  border-color: #007bff;
}

.btn-primary:hover {
  background-color: #0056b3;
  border-color: #0056b3;
}

.text-center {
  text-align: center;
}
</style>
