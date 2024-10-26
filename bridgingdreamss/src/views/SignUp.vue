  <template>
    <!-- <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.5.0/css/bootstrap.min.css">
    <link href='https://unpkg.com/boxicons@2.1.4/css/boxicons.min.css' rel='stylesheet'>
    <link href="https://stackpath.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css" rel="stylesheet"> -->
    <link href="https://stackpath.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css" rel="stylesheet">

    
    <header id="header">
    <!-- <nav class="navbar navbar-expand-lg fixed-top shadow custom-navbar" id="nav_bar">
        <div class="container container-fluid">
          <div class="navbar-header">
            <a class="navbar-brand" href="/ninjaturtles/landingpage/landingpage.html">
              <img src="../assets/bridgingdreamslogo.png" alt="bridgingDreamsLogo" width="75" height="60" style="margin-left: 60px; outline: none;">
            </a>
          </div>
          <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span class="navbar-toggler-icon"></span>
          </button>
          <div class="collapse navbar-collapse" id="navbarSupportedContent">
            <ul class="navbar-nav ms-auto mb-2 mb-lg-0">
              <li class="nav-item">
                <router-link to="/" class="nav-link active font-weight-bold" aria-current="page"  style="font-size: 20px; color: #007bff; font-weight: bold;">Home</router-link>
              </li>
              <li class="nav-item">
                <router-link to="/signup" class="nav-link font-weight-bold" aria-current="page" href="../LogIn/RegisterForm/login.html" style="font-size: 20px; color: #007bff; font-weight: bold">Sign up</router-link>
              </li>
              <li class="nav-item">
                <router-link to="/login" class="nav-link font-weight-bold" aria-current="page" href="../LogIn/RegisterForm/login.html" style="font-size: 20px; color: #007bff; font-weight: bold">Login</router-link>
              </li>
            </ul>
          </div>
        </div>
    </nav> -->
    <div class="container" id="register_container">
      <div class="row px-3">
        <div class="col-lg-10 col-xl-9 card flex-row mx-auto px-0">
          <div class="card-body">
            <h3 class="title text-center mt-4 font-weight-bold">
              Register
            </h3>
            <form class="form-box px-3" @submit.prevent="signUp">
              <div class="form-input">
                <span style="color: #0069d9"><i class="fa fa-envelope-o"></i></span>
                <input type="email" name=""  v-model="form.email" placeholder="Email Address" tabindex="10" required>
              </div>
              <div class="form-input">
                <span style="color: #0069d9"><i class="fa fa-key"></i></span>
                <input type="password" name="" v-model="form.password" placeholder="Password" required>
              </div>

              <div class="radio-input">
                <span>I want to register as a</span>
                <br>
                <span style="padding-right: 20px; padding-left:60px">
                <input type="radio" v-model="form.type" name="registration_type" value="tutor" id="tutor">
                <label for="tutor" >Tutor</label>
                </span>
                <span style="padding-left: 20px">
                    <input v-model="form.type" type="radio" name="registration_type" value="parent" id="parent">
                    <label for="parent">Parent</label>
                </span>
              </div>

              <div class="mb-3 d-grid">
                <button type="submit" class="btn text-uppercase" style="color: whitesmoke">
                  Register
                </button>
              </div>

              <hr class="my-4">
            
              <div class="text-center mb-2">
                Already have an account?
                <router-link to="/login" class="login_link">Log In</router-link>
              </div>
            </form>
          </div>
          <div class="img-left d-none d-md-flex"></div>
        </div>
      </div>

    </div>
    
  </header>
    

  
  </template>
  
  <script>
  import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth'
  import { auth } from '../firebase/init.js'  

  export default {
    //emits: ['loggedIn'],
    data() {
      return {
        form: {
          email:    '',
          password: '',
          type: null,
        },

      }
    },
    methods: {
      signUp() {
        // register new user
        createUserWithEmailAndPassword(auth,this.form.email,this.form.password)
          .then((credential) => {
          // registered and signed in
          

          // this.$emit('loggedIn')
          updateProfile(credential.user, {
            displayName: this.form.type
            
          }).then(() => {
            const user = credential.user
            if(user.displayName == 'tutor'){
              this.$router.push({name: "tutorHome"})
            }
            else{
              this.$router.push({name: "home"})

            }

          })

          
        })

        .catch((error) => {
          console.log(error.message)
          alert(error.message)
        })
      }
    },
  }
  
  </script>
  <style scoped>
  *{
    font-family: 'Constantia', serif;
  }
  
  /* #nav_bar {
    box-shadow: 0 0.5rem 1rem 0 rgba(0, 0, 0, 0.1);
  } */
  
  
  .login_link {
    font-weight: bold;
  }
  
  /* Add space between the navigation brand and the navigation links */
  /* .navbar-brand {
    margin-right: 20px;
  }
  
  .navbar-nav {
    margin-left: auto;
  } */

  #register_container{
    margin-top: 30px;
  }
  
  #header {
      height: auto;
      padding: 50px 0px 70px 0px;
      background-color: #fff9f4;
  }
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
  
  .radio-input > span:first-child {
    font-weight: normal;
  }
  .radio-input input[type="radio"],
  .radio-input label{
    font-weight: normal;
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