<template>
  <div v-if="!isLoggedIn">
    <nav class="navbar navbar-expand-lg fixed-top shadow custom-navbar" id="nav_bar">
        <div class="container container-fluid">
          <div class="navbar-header">
            <a class="navbar-brand" href="/">
              <img src="./assets/bridgingdreamslogo.png" alt="bridgingDreamsLogo" width="75" height="60" style="outline: none;">
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
    </nav>
  </div>
  <div v-else>
    <div v-if="type === 'tutor'">
        <nav class="navbar navbar-expand-lg fixed-top shadow custom-navbar" id="nav_bar">
            <div class="container container-fluid">
            <div class="navbar-header">
                <router-link to="/TutorHomePage" class="navbar-brand">
                <img src="./assets/bridgingdreamslogo.png" alt="bridgingDreamsLogo" width="75" height="60" style="outline: none;">
                </router-link>
            </div>
            <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                <span class="navbar-toggler-icon"></span>
            </button>
            <div class="collapse navbar-collapse" id="navbarSupportedContent">
                <ul class="navbar-nav ms-auto mb-2 mb-lg-0">
                    <li class="nav-item">
                        <router-link to="/TutorHomePage" class="nav-link active font-weight-bold" aria-current="page"  style="font-size: 20px; color: #007bff; font-weight: bold;">Home</router-link>
                    </li>
                    <li class="nav-item">
                        <router-link to="/library" class="nav-link font-weight-bold" aria-current="page"  style="font-size: 20px; color: #007bff; font-weight: bold">Resource Library</router-link>
                    </li>
                    <li class="nav-item">
                        <router-link to="/tutorprofile" class="nav-link font-weight-bold" aria-current="page" style="font-size: 20px; color: #007bff; font-weight: bold">Profile</router-link>
                    </li>
                    <li class="nav-item">
                        <router-link to="/myUploads" class="nav-link font-weight-bold" aria-current="page" style="font-size: 20px; color: #007bff; font-weight: bold">My Uploads</router-link>
                    </li>
                    <li class="nav-item">
                        <!-- <router-link to="/" class="nav-link font-weight-bold" aria-current="page"  style="font-size: 20px; color: #007bff; font-weight: bold">Sign Out</router-link> -->
                        <button @click="signOut()" class="nav-link font-weight-bold" style="font-size: 20px; color: #007bff; font-weight: bold" >Log Out</button>
                    </li>
                </ul>
            </div>
            </div>
        </nav>
    </div>
    <div v-if="type === 'parent'">
        <nav class="navbar navbar-expand-lg fixed-top shadow custom-navbar" id="nav_bar">
            <div class="container container-fluid">
            <div class="navbar-header">
                <a class="navbar-brand" href="/home">
                <img src="./assets/bridgingdreamslogo.png" alt="bridgingDreamsLogo" width="75" height="60" style="outline: none;">
                </a>
            </div>
            <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                <span class="navbar-toggler-icon"></span>
            </button>
            <div class="collapse navbar-collapse" id="navbarSupportedContent">
                <ul class="navbar-nav ms-auto mb-2 mb-lg-0">
                    <li class="nav-item">
                        <router-link to="/home"  class="nav-link active font-weight-bold" aria-current="page"  style="font-size: 20px; color: #007bff; font-weight: bold;">Home</router-link>
                    </li>
                    <li class="nav-item">
                        <router-link to="/library" class="nav-link font-weight-bold" aria-current="page"  style="font-size: 20px; color: #007bff; font-weight: bold">Resource Library</router-link>
                    </li>
                    <li class="nav-item">
                        <router-link to="/parentProfile" class="nav-link font-weight-bold" aria-current="page" style="font-size: 20px; color: #007bff; font-weight: bold">Profile</router-link>
                    </li>
                    
                    <li class="nav-item">
                        <!-- <router-link to="/" class="nav-link font-weight-bold" aria-current="page"  style="font-size: 20px; color: #007bff; font-weight: bold">Sign Out</router-link> -->
                        <button @click="signOut()" class="nav-link font-weight-bold" style="font-size: 20px; color: #007bff; font-weight: bold" >Log Out</button>
                    </li>
                </ul>
            </div>
            </div>
        </nav>
    </div>
  </div>
  <router-view/>
</template>

<script>


import { auth } from './firebase/init.js'
import { signOut, onAuthStateChanged } from 'firebase/auth'

export default {
  data() {
    return {
      isLoggedIn: false,
      currentUser: null,
      type: ''
      
    }
  },
  methods: {
    signOut() {
      signOut(auth)
      .then(() => {
        // user signed-out
        this.isLoggedIn = false
        this.type = ''
        this.$router.push({name: "landingPage"})
      })
    },
    
  },
  mounted(){
    onAuthStateChanged(auth, (user) => {
      if (user) {
        // User is signed in
        this.type = user.displayName
        this.currentUser = user;
        this.isLoggedIn = true;
        
      } else {
        // User is signed out
        this.currentUser = null;
        this.type = ''
        this.isLoggedIn = false;
      }
    })
  }
}
</script>

<style>
    *{
      font-family: 'Constantia', serif;

    }
    #nav_bar {
        height: 76px;
        background-color: white;
        box-shadow: 0 0.5rem 1rem 0 rgba(0, 0, 0, 0.1);
    }

    .navbar-brand {
        margin-right: 20px;
    }

    .navbar-nav {
        margin-left: auto;
    }
</style>