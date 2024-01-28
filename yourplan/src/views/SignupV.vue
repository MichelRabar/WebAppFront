<template>
  <div class="signup-page" style="background-color: yellow">
    <div id="image-container" style="text-align: center; margin-bottom: 20px">
      <img src="@/assets/bell.png" alt="Bell Image" />
    </div>
    <div class="container">
      <div class="row">
        <div class="col"></div>
        <div class="col-sm-6">
          <div class="d-flex justify-content-center align-items-center h-100">
            <div class="signup-form">
              <h2>Sign Up</h2>
              <form @submit.prevent="signupUser">
                <label for="username">Username:</label>
                <input type="text" v-model="username" required />
                
                <label for="password">Password:</label>
                <input type="password" v-model="password" required />
          
                <button type="submit">Sign Up</button>
              </form>
            </div>
          </div>
        </div>
        <div class="col"></div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      username: '',
      password: ''
    };
  },
  methods: {
    signupUser() {
      console.log('Registriran korisnik:', this.username);
      // Ovdje možete dodati logiku za registraciju korisnika
    }
  }
};
</script>

<style scoped>
</style>
