<template>
  <div class="homepage">
    <!-- Hero Section -->
    <div class="hero-section">
      <div id="image-container" class="text-center">
        <img src="@/assets/bell.png" alt="Bell Icon" class="hero-image" />
      </div>
      <div class="text-center hero-content">
        <h1>Dobrodošli na YOURPLAN!</h1>
        <p>
          Pronađi svog trenera i ostvari svoje fitness ciljeve danas. Postani najbolja verzija sebe uz podršku stručnjaka. Pridruži se zajednici koja dijeli tvoj entuzijazam za zdravim životom. Učlani se sada i kreni prema novom tebi!
        </p>
        <router-link v-if="!isAuthenticated" to="/register" class="btn btn-primary">Pridruži se sada</router-link>
      </div>
    </div>

    <!-- Features Section -->
    <div class="container mt-5">
      <h2 class="text-center mb-4">Naše Značajke</h2>
      <div class="row">
        <div class="col-md-4 mb-4">
          <div class="feature-card text-center">
            <img src="@/assets/personal.jpg" alt="Personalizovani Planovi" class="feature-image" />
            <h3>Personalizovani Planovi</h3>
            <p>Ostvarite svoje ciljeve uz planove prilagođene vašim potrebama i ciljevima.</p>
          </div>
        </div>
        <div class="col-md-4 mb-4">
          <div class="feature-card text-center">
            <img src="@/assets/treneri.jpg" alt="Iskusni Treneri" class="feature-image" />
            <h3>Iskusni Treneri</h3>
            <p>Radite sa vrhunskim trenerima koji će vam pomoći da postignete vrhunske rezultate.</p>
          </div>
        </div>
        <div class="col-md-4 mb-4">
          <div class="feature-card text-center">
            <img src="@/assets/logo.png" alt="Podrška 24/7" class="feature-image" />
            <h3>Podrška 24/7</h3>
            <p>Naša zajednica je tu za vas u svakom trenutku, 24 sata dnevno, 7 dana u nedelji.</p>
          </div>
        </div>
      </div>
    </div>

    <!-- Testimonials Section -->
    <div class="container mt-5">
      <h2 class="text-center mb-4">Šta naši korisnici kažu</h2>
      <div class="row">
        <div class="col-md-4 mb-4">
          <div class="testimonial text-center">
            <p>"YOURPLAN mi je pomogao da ostvarim svoje fitness ciljeve brže nego što sam mogao da zamislim. Preporučujem ga svakome!"</p>
            <p><strong>Marko Jovanović</strong></p>
          </div>
        </div>
        <div class="col-md-4 mb-4">
          <div class="testimonial text-center">
            <p>"Fantastičan program sa odličnim trenerima i podrškom. Uvek imam motivaciju da nastavim dalje."</p>
            <p><strong>Ivana Petrović</strong></p>
          </div>
        </div>
        <div class="col-md-4 mb-4">
          <div class="testimonial text-center">
            <p>"Izvanredno iskustvo! Planovi su prilagođeni, a zajednica je izuzetno podržavajuća."</p>
            <p><strong>Stefan Novak</strong></p>
          </div>
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
      isAuthenticated: false
    };
  },
  async created() {
    await this.checkAuthentication();
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
          this.isAuthenticated = true;
        } catch (error) {
          this.isAuthenticated = false;
        }
      } else {
        this.isAuthenticated = false;
      }
    }
  }
};
</script>

<style scoped>
.homepage {
  background-color: #f8f9fa;
}

.hero-section {
  background-color: yellow;
  padding: 40px 0;
  text-align: center;
}

.hero-image {
  width: 200px;
  height: auto;
}

.hero-content {
  margin-top: 20px;
}

.hero-content h1 {
  font-size: 2.5rem;
  font-weight: bold;
}

.hero-content p {
  font-size: 1.5rem; /* Povećanje fonta */
  margin-bottom: 20px;
}

.btn-primary {
  background-color: #007bff;
  border-color: #007bff;
}

.btn-primary:hover {
  background-color: #0056b3;
  border-color: #0056b3;
}

.feature-card {
  background: #fff;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  padding: 20px;
  text-align: center;
}

.feature-image {
  width: 85%;
  height: 200px; /* Fiksna visina */
  object-fit: cover; /* Zadržavanje omjera slike, s viškom odrezanim */
  margin-bottom: 15px;
}

.feature-card p {
  font-size: 1.15rem; /* Povećanje fonta za <p> unutar feature-card */
}

.testimonial {
  background: #fff;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  padding: 20px;
  text-align: center;
  font-style: italic;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 100%; /* Osigurava istu visinu */
}

.testimonial p {
  font-size: 1.15rem; /* Povećanje fonta za <p> unutar testimonial */
  margin-bottom: 10px;
}
</style>
