<template>
    <!-- <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/css/bootstrap.min.css" rel="stylesheet"
     integrity="sha384-T3c6CoIi6uLrA9TneNEoa7RxnatzjcDSCmG1MXxSR1GAsXEV/Dwwykc2MPK8M2HN" crossorigin="anonymous"> -->
    <!-- <link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.15.1/css/all.css" integrity="sha384-vp86vTRFVJgpjF9jiIGPEEqYqlDwgyBgEF109VFjmqGmIY/Y4HV4d3Gp2irVfcrp" crossorigin="anonymous"> -->
    <!-- Import Boxicon CSS -->
    <link href='https://unpkg.com/boxicons@2.1.4/css/boxicons.min.css' rel='stylesheet'>
    <header id="header">
      <!-- <nav class="navbar navbar-expand-lg fixed-top shadow custom-navbar" id="navbar">
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
                <router-link to="/signup" class="nav-link font-weight-bold" aria-current="page" style="font-size: 20px; color: #007bff; font-weight: bold">Sign Up</router-link>
              </li>
              <li class="nav-item">
                <router-link to="/login" class="nav-link font-weight-bold" aria-current="page"  style="font-size: 20px; color: #007bff; font-weight: bold">Login</router-link>
              </li>
            </ul>
          </div>
        </div>
      </nav> -->

      <section id="cover" class="container my-4">
        <div class="row g-2 justify-content-between">
          <div class="col-md-6 d-flex justify-content-center align-items-center order-lg-2">
            <div class="p-3">
              <img class="w-100 img-fluid" src="../assets/home.png" alt="">
            </div>
          </div>
          <div class="col-md-6 d-flex justify-content-center align-items-center order-2">
            <div class="p-3 mt-md-5">
              <h3 class="custom-highlight" style="text-align:center">
                <div class="waviy">
                  <span style="--i:1">O</span>
                  <span style="--i:2">U</span>
                  <span style="--i:3">R</span>
                  <span style="--i:4">&nbsp;&nbsp;</span> 
                  <span style="--i:5">S</span>
                  <span style="--i:6">T</span>
                  <span style="--i:7">O</span>
                  <span style="--i:8">R</span>
                  <span style="--i:9">Y</span>
                </div>
              </h3>
              <p>
                In the vibrant heart of Singapore, where opportunity and prosperity often grace the lives of the fortunate,
                we discovered a hidden truth: the untapped brilliance within low-income families yearning for a chance to shine.
                In this city, like many others, educational inequality casts a shadow over the dreams of many children
                              
                <br><br>
                In response, we set forth on a mission called "Bridging Dreams." We envisioned a Singapore where every child,
                regardless of their background, could access quality education.
              
                <br><br>
              
                "Bridging Dreams" is more than just a website; it's a lifeline for those whose dreams are dimmed by circumstance.
                Our platform connects low-income families with dedicated volunteer tutors who inspire and teach. Families find tutors
                tailored to their needs, and tutors share their qualifications and expertise.
                              
                <br><br>
                Join us in "Bridging Dreams", and help us create a brighter, more equal Singapore for all.
              </p>
            </div>
          </div>
        </div>
      </section>
    </header>  
    <main class="container">
      <section id="casual-shoes" class="mt-5">
        <h2 id="title2" style="text-align: center">Our Highlight</h2>
        <div class="row row-cols-1 row-cols-md-3 g-4">
          <div class="col-lg-4 col-md-6">
            <div class="card h-100 shadow custom-card">
              <img src="../assets/intro_photo_6.jpg" class="card-img-top w-100 custom-bg" alt="...">
              <div class="card-body">
                <h4 class="card-title" style="text-align: center">One to One Session</h4>
                <p class="card-text" style="text-align: center">Recevice one to one tuition session from our volunteering tutors</p>
              </div>
            </div>
          </div>
          <div class="col-lg-4 col-md-6">
            <div class="card h-100 shadow custom-card">
              <img src="../assets/intro_photo_3.jpg" class="card-img-top w-100 custom-bg" alt="...">
              <div class="card-body">
                <h4 class="card-title" style="text-align: center">Learning Resources</h4>
                <p class="card-text" style="text-align: center">A well-organised collection educational resources catering to all primary and secondary levels</p>
              </div>
            </div>
          </div>
          <div class="col-lg-4 col-md-6">
            <div class="card h-100 shadow custom-card">
              <img src="../assets/intro_photo_2.jpg" class="card-img-top w-100 custom-bg" alt="...">
              <div class="card-body">
                <h4 class="card-title" style="text-align: center">Efficient Booking Sytem</h4>
                <p class="card-text" style="text-align: center">An easy-to-use booking system to allow parents to select tuition session on their preference</p>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section id="subscribe" class="mt-5 mb-5">
        <div class="row d-flex justify-content-center align-items-center">
          <div class="col-md-12">
            <div class="card custom-card">
              <div class="text-center">
                <h4 class="d-block mt-3 text-uppercase">Subscribe to our website</h4>
                  <div class="m-5">
                    <div class="input-group mb-3 mt-4">
                      <input type="text" class="form-control" placeholder="Enter your email"> <button class="btn btn-success border-rad custom-btn" type="button" id="button-addon2">Subscribe</button>
                    </div>
                  </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
</template>
  
<script>
  
  import { auth } from '../firebase/init.js'  

  export default {
    data() {
      return {
        currentUser: null,
      }
    },
    
    created(){
        var user = auth.currentUser
        this.currentUser = user
        
    }
  }
  
</script>
<style scoped>
  template{
    background-color: whitesmoke;
    font-family: 'Constantia', serif;
  }
  /* div {
    display: block;
  } */
  h1 {
      font-size: 80px;
      color: #363958;
      padding: 0px;
      margin: 0px;
  }
  h2 {
      font-size: 48px;
      color: #363958;
  }
  h4 {
      font-size: 24px;
      font-weight: 1000;
      color: #363958;
  }
  h5 {
      font-size: 20px;
      font-weight: 1000;
      color: #363958;
  }
  .waviy span {
      position: relative;
      display: inline-block;  
      animation: waviy 2s infinite;
      animation-delay: calc(.1s * var(--i));
      font-weight: 1000;
      letter-spacing: 2px;
  }
  @keyframes waviy {
  0%,40%,100% {
      transform: translateY(0)
  }
  20% {
      transform: translateY(-20px)
  }
  }
  #header {
      height: auto;
      padding: 50px 0px 70px 0px;
      background-color: #fff9f4;
  }
  
  /* #navbar {
      background-color: white;
      text-transform: uppercase;
  } */

  #title2 {
    font-size: 48px;
    color: #363958;
    padding-bottom: 10px;
  }

  .custom-ul {
      text-align: center;
      background-color: #fff9f4;
  }
  .custom-li {
      font-weight: 700;
      padding: 0px 25px;
  }
  .custom-logo {
      width: 15%;
  }

  .custom-btn {
      background-color: #3D4FF3;
      padding: 10px;
      border: none;
  }

  .custom-card {
      border-radius: 20px;
      padding: 12px;
      box-shadow: 0px 10px 30px rgba(0, 0, 0, 0.05);
      border: none;
      
  }

  .custom-bg {
      height: 350px;
      background: red;
      border-radius: 12px;
  }

  .custom-img-width {
      width: 80px;

  }
  .custom-service-card {
      border-radius: 10px;
      box-shadow: 0px 10px 30px rgba(0, 0, 0, 0.05);
      border: none;
  }
</style>