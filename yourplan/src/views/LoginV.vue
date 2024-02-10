<template>
  <div class="login-page" style="background-color: rgb(183, 231, 167);">
    <div id="image-container" style="text-align: center; margin-bottom: 20px;">
      <img src="@/assets/bell.png" alt="Bell Image" />
    </div>
    <div class="container">
      <div class="row">
        <div class="col"></div>
        <div class="col-sm-6">
          <div class="d-flex justify-content-center align-items-center h-100">
            <div class="login-form">
              <h2 style="color: #007bff;">Login</h2>
              <form @submit.prevent="loginUser">
                <label for="username">Username:</label>
                <input type="text" v-model="username" required />
                
                <label for="password">Password:</label>
                <input type="password" v-model="password" required />
          
                <button type="submit" class="btn btn-primary">Login</button>
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
    loginUser() {
      console.log('Logged in user:', {
        username: this.username,
        password: this.password
      });
      // Ovdje možete dodati logiku za prijavu korisnika
    }
  }
};
</script>

<style scoped>
.login-form {
  background-color: white;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0px 0px 10px 0px rgba(0,0,0,0.1);
}

.login-form label {
  margin-bottom: 5px;
  color: #007bff;
}

.login-form input {
  width: 100%;
  padding: 8px;
  margin-bottom: 10px;
  border: 1px solid #ccc;
  border-radius: 4px;
}

.login-form button {
  width: 100%;
  padding: 10px;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

.login-form button:hover {
  background-color: #0056b3;
}
</style>
