<template>
  <!-- <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.5.0/css/bootstrap.min.css">
  <link href='https://unpkg.com/boxicons@2.1.4/css/boxicons.min.css' rel='stylesheet'> -->
  <link href="https://stackpath.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css" rel="stylesheet">
  
  <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-T3c6CoIi6uLrA9TneNEoa7RxnatzjcDSCmG1MXxSR1GAsXEV/Dwwykc2MPK8M2HN" crossorigin="anonymous">

  
  <header id="header">
    <div class="container" id="login_container">
    <div class="row px-3">
      <div class="col-lg-10 col-xl-9 card flex-row mx-auto px-0">
        <div class="img-left d-none d-md-flex"></div>
        <div class="card-body">
          <h3 class="title text-center mt-4 font-weight-bold">
            Login
          </h3>
          <form class="form-box px-3" @submit.prevent="login">
            <div class="form-input">
              <span style="color: #0069d9"><i class="fa fa-envelope-o"></i></span>
              <input type="email" v-model="form.email" placeholder="Email Address" tabindex="10" required>
            </div>
            <div class="form-input">
              <span style="color: #0069d9"> <i class="fa fa-key"></i></span>
              <input type="password" name="" placeholder="Password" v-model="form.password" required>
            </div>

            <div class="mb-3 d-grid">
              <button type="submit" class="btn text-uppercase" style="color: whitesmoke; font-weight: bold;">
                Login
              </button>
            </div>

            <div class="text-right">
              <a href="#" class="forget-link">
                Forget Password?
              </a>
            </div>

            <hr class="my-4">

            <div class="text-center mb-2">
              Don't have an account?
              <router-link to="/signup" class="login_link">Register Here</router-link>
            </div>
          </form>
        </div>
      </div>
    </div>
    </div>
  </header>
</template>

<script>
import { signInWithEmailAndPassword } from 'firebase/auth'
import {db, auth } from '../firebase/init.js'
import {collection, getDocs, query, where,} from 'firebase/firestore'


export default {
  data() {
    return {
      form: {
        email:  '',
        password: ''
      },
      gotTutorProfile: null,
      gotParentProfile: null,
      
    }
  },
  methods: {
    async login() {
  try {
    // Login user
    const userCredential = await signInWithEmailAndPassword(auth, this.form.email, this.form.password);

    // Get the user from userCredential
    const user = userCredential.user;

    if (user.displayName === 'tutor') {
      const tutorsCollection = collection(db, 'tutors');
      const q = query(tutorsCollection, where('userID', '==', user.uid));
      const querySnapshot = await getDocs(q);

      if (querySnapshot.size > 0) {
        this.$router.push({ name: 'tutorHome' });
      } else {
        this.$router.push({ name: 'tutorProfile' });
      }
    } else {
      const tutorsCollection = collection(db, 'parents');
      const q = query(tutorsCollection, where('userID', '==', user.uid));
      const querySnapshot = await getDocs(q);

      if (querySnapshot.size > 0) {
        this.$router.push({ name: 'home' });
      } else {
        this.$router.push({ name: 'parentProfile' });
      }
    }
  } catch (error) {
    console.error('Login error:', error);
  }
}

  }
}

</script>
<style scoped>
*{
  /* height: 100vh; */
  font-family: 'Constantia', serif;
}

template{
  background-color: #fff9f4;
}

#header {
      height: auto;
      padding: 50px 0px 70px 0px;
      background-color: #fff9f4;
  }
/* #nav_bar {
  height: 76px;
  background-color: white;
  box-shadow: 0 0.5rem 1rem 0 rgba(0, 0, 0, 0.1);

}

#nav_bar {
  box-shadow: 0 0.5rem 1rem 0 rgba(0, 0, 0, 0.1);

} */


.login_link {
  font-weight: bold;
}

#login_container{
  margin-top: 40px;
}

/* Add space between the navigation brand and the navigation links */
/* .navbar-brand {
  margin-right: 20px;
}

.navbar-nav {
  margin-left: auto;
} */

.card{
  overflow: hidden;
  border: 0 !important;
  border-radius: 20px !important;
  box-shadow: 0 0.5rem 1rem 0 rgba(0, 0, 0, 0.1);
  margin-top: 50px;
}

.img-left{
  width: 45%;
  background: url('~@/assets/bluetheme.jpeg') center;
  background-size: cover;
}

.card-body{
  padding: 2rem;
}

.title{
  margin-bottom: 2rem;
}

.form-input{
  position: relative;
}

.form-input input{
  width: 100%;
  height: 45px;
  padding-left: 40px;
  margin-bottom: 20px;
  box-sizing: border-box;
  box-shadow: none;
  border: 1px solid #00000020;
  border-radius: 50px;
  outline: none;
  background: transparent;
}

.form-input span{
  position: absolute;
  top: 10px;
  padding-left: 15px;
  color: #12443B;
}

.form-input input::placeholder{
  color: black;
  padding-left: 0px;
}

.form-input input:focus, .form-input input:valid{
  border: 2px solid #0069d9;
}

.form-input input:focus::placeholder{
  color: #454b69;
}

.custom-checkbox .custom-control-input:checked ~ .custom-control-label::before{
  background-color: #0069d9 !important;
  border: 0px;
}

.form-box button[type="submit"]{
  margin-top: 10px;
  border: none;
  cursor: pointer;
  border-radius: 50px;
  background: #007bff;
  color: #fff;
  font-size: 90%;
  font-weight: bold;
  letter-spacing: .1rem;
  transition: 0.5s;
  padding: 12px;
}

.form-box button[type="submit"]:hover{
  background: #0069d9;
  transition: all 0.3s ease-in-out;
}

.forget-link, .register-link{
  color: #007bff;
  font-weight: bold;
}

.forget-link:hover, .register-link:hover{
  color: #0069d9;
  text-decoration: none;
}

/* Footer */
#footer {
  padding: 25px 0px;
}
footer h5 {
  padding: 10px 0px;
  /* border: 1px solid; */
}
#footer li a {
  text-decoration: none;
}
.custom-footer-margin {
  background-color: black;
  color: white;
}
/* end footer */
</style>


