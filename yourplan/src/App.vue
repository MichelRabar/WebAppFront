<template>
  <div id="app">
    <nav class="navbar navbar-expand-lg navbar-light bg-light">
      <a class="navbar-brand" href="#">YourPlan</a>
      <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarNav">
        <ul class="navbar-nav">
          <li class="nav-item active">
            <router-link class="nav-link" to="/">Home</router-link>
          </li>
          <li class="nav-item">
            <router-link class="nav-link" to="/about">About</router-link>
          </li>
        </ul>
        
        <div class="auth-buttons ml-auto">
          <router-link to="/LoginV" class="btn btn-outline-success my-2 my-sm-0">Login</router-link>
          <router-link to="/SignupV" class="btn btn-outline-info my-2 my-sm-0">Sign Up</router-link>
        </div>
      </div>
    </nav>
    <router-view/>

    
    <footer class="footer">
      <div class="container">
        <div class="row">
          <div class="col-md">
            <p>Radno vrijeme:</p>
            <p>Pon-Pet: 08:00 - 20:00</p>
            <p>Sub: 08:00 - 13:00</p>
          </div>
          <div class="col-md text-center">
            <p>Kontaktirajte nas</p>
            <div class="footer-icons">
              <a href="#"><img src="@/assets/youtube.png" alt="YouTube Icon" class="footer-icon" /></a>
              <a href="#"><img src="@/assets/instagram.png" alt="Instagram Icon" class="footer-icon" /></a>
              <a href="#"><img src="@/assets/facebook.png" alt="Facebook Icon" class="footer-icon" /></a>
              <p></p>
              
              <p><span class="fake-number">091-767-0634</span></p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  </div>
</template>

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

.fake-number {
  font-size: 18px;
  margin-left: 10px;
}
</style>
