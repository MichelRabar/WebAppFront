<template>
  <div id="app">
    <nav class="navbar navbar-expand-lg navbar-light bg-light">
      <a class="navbar-brand" href="/">YourPlan</a>
      <button
        class="navbar-toggler"
        type="button"
        data-toggle="collapse"
        data-target="#navbarNav"
        aria-controls="navbarNav"
        aria-expanded="false"
        aria-label="Uključi navigaciju"
      >
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarNav">
        <ul class="navbar-nav">
          <li class="nav-item">
            <router-link class="nav-link" to="/">Početna</router-link>
          </li>
          <li class="nav-item">
            <router-link class="nav-link" to="/TreneriView">Treneri</router-link>
          </li>
          <li class="nav-item">
            <router-link class="nav-link" to="/MealprepView">Planiraj obroke</router-link>
          </li>
          <li class="nav-item">
            <router-link class="nav-link" to="/workouts">Planiraj trening</router-link>
          </li>
          
          <!-- Prikazivanje linka za '/add-workout' samo ako je korisnik validiran i jeTrener -->
          <li class="nav-item" v-if="isAuthenticated && isTrainer">
            <router-link class="nav-link" to="/add-workout">Dodaj trening</router-link>
          </li>
          <li class="nav-item" v-if="isAuthenticated && isTrainer">
            <router-link class="nav-link" to="/meals">Dodaj obrok</router-link>
          </li>
          <li class="nav-item" v-if="isAuthenticated && isTrainer">
            <router-link class="nav-link" to="/mymeals">Moji obroci</router-link>
          </li>
          <li class="nav-item" v-if="isAuthenticated && isTrainer">
            <router-link class="nav-link" to="/myworkout">Moji treninzi</router-link>
          </li>
          
        </ul>
        
        <div class="auth-buttons ml-auto">
          <template v-if="isAuthenticated">
            <router-link to="/profile" class="btn btn-outline-primary my-2 my-sm-0 mx-1">Profil</router-link>
            <button @click="logout" class="btn btn-outline-danger my-2 my-sm-0 mx-1">Odjava</button>
          </template>
          <template v-else>
            <router-link to="/login" class="btn btn-outline-success my-2 my-sm-0 mx-1">Prijava</router-link>
            <router-link to="/register" class="btn btn-outline-info my-2 my-sm-0 mx-1">Registracija</router-link>
          </template>
        </div>
      </div>
    </nav>

    <router-view/>

    <footer class="footer" style="margin-top: 15px;">
      <div class="container">
        <div class="row">
          <div class="col-md">
            <p>Radno vrijeme:</p>
            <p>Pon-Pet: 08:00 - 20:00</p>
            <p>Sub: 08:00 - 13:00</p>
          </div>
          <div class="col-md text-center">
            <p>Kontaktirajte nas:</p>
            <div class="footer-icons">
              <a href="#"><img src="@/assets/youtube.png" alt="YouTube ikona" class="footer-icon" /></a>
              <a href="#"><img src="@/assets/instagram.png" alt="Instagram ikona" class="footer-icon" /></a>
              <a href="#"><img src="@/assets/facebook.png" alt="Facebook ikona" class="footer-icon" /></a>
              <p></p>
              <p><span class="contact-number">091-767-0634</span></p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  name: 'App',
  data() {
    return {
      isAuthenticated: false,
      isTrainer: false // Novi atribut koji čuva informaciju o tome da li je korisnik trener
    };
  },
  methods: {
    async checkAuthentication() {
      const token = localStorage.getItem('token');
      if (token) {
        try {
          const response = await axios.get('http://localhost:5000/api/users/profile', {
            headers: {
              'Authorization': `Bearer ${token}`
            }
          });

          // Provjeravamo da li je korisnik validiran i da li je trener
          this.isAuthenticated = true;
          this.isTrainer = response.data.jeTrener; // Pretpostavlja se da je 'jeTrener' dio odgovora

        } catch (error) {
          console.error('Greška pri provjeri autentifikacije:', error.message);
          this.isAuthenticated = false;
          this.isTrainer = false;
        }
      } else {
        this.isAuthenticated = false;
        this.isTrainer = false;
      }
    },
    logout() {
      localStorage.removeItem('token');
      this.isAuthenticated = false;
      this.isTrainer = false;
      this.$router.push('/login');
    }
  },
  created() {
    this.checkAuthentication();
  },
  watch: {
    '$route'(to, from) {
      this.checkAuthentication();
    }
  }
};
</script>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  padding: 30px;
}

.auth-buttons {
  display: flex;
  align-items: center;
}

.footer {
  background-color: #f1f1f1;
  padding: 20px 0;
}

.footer-icons a {
  margin: 0 10px;
}

.footer-icon {
  width: 2vw;
}

.contact-number {
  font-size: 18px;
  margin-left: 10px;
}
</style>
