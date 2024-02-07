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
              <h2 style="color: #007bff">Sign Up</h2>
              <form @submit.prevent="signupUser">
                <label for="email">Email:</label>
                <input type="email" v-model="email" required />
                
                <label for="username">Username:</label>
                <input type="text" v-model="username" required />
                
                <label for="password">Password:</label>
                <input type="password" v-model="password" required />
                
                <label for="confirmPassword">Confirm Password:</label>
                <input type="password" v-model="confirmPassword" required />
          
                <button type="submit" class="btn btn-primary">Sign Up</button>
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
      email: '',
      username: '',
      password: '',
      confirmPassword: ''
    };
  },
  methods: {
    signupUser() {
      console.log('Registered user:', {
        email: this.email,
        username: this.username,
        password: this.password,
        confirmPassword: this.confirmPassword
      });
      // Ovdje možete dodati logiku za registraciju korisnika
    }
  }
};
</script>

<style scoped>
.signup-form {
  background-color: white;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0px 0px 10px 0px rgba(0,0,0,0.1);
}

.signup-form label {
  margin-bottom: 5px;
  color: #007bff;
}

.signup-form input {
  width: 100%;
  padding: 8px;
  margin-bottom: 10px;
  border: 1px solid #ccc;
  border-radius: 4px;
}

.signup-form button {
  width: 100%;
  padding: 10px;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

.signup-form button:hover {
  background-color: #0056b3;
}
</style>
