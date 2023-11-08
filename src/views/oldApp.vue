<template>
    <div v-if="!isLoggedIn">
      <!-- login -->
      <template v-if="showLogin">
        <login-form @loggedIn="isLoggedIn = true"/>
        <p>No account yet? <span @click="showLogin=false">Sign up</span> instead.</p>
      </template>
      <!-- or register -->
      <template v-else>
        <signup-form @loggedIn="isLoggedIn = true"/>
        <p>Already registered? <span @click="showLogin=true">Login</span> instead.</p>  
      </template>
    </div>
    <!-- is logged in -->
    <div v-else>
      <div v-if="type === 'tutor'">
        <nav>
          <router-link to="/home">Home</router-link> | 
          <router-link to="/library">Resource Library</router-link> |
          <router-link to="/tutorprofile">Profile</router-link> |
          <router-link to="/myUploads">Uploads</router-link> |
          <router-link to="/accountPage">Account</router-link> |
          <button @click="signOut">Sign Out</button>
        </nav>
      </div>
      <div v-else>
        <nav>
          <router-link to="/home">Home</router-link> | 
          <router-link to="/library">Resource Library</router-link> |
          <router-link to="/parentProfile">Profile</router-link> |
          <router-link to="/accountPage">Account</router-link> |
          <button @click="signOut">Sign Out</button>
        </nav>
      </div>
      
      <router-view/>
    </div>
  </template>
  
  <script>
  import SignupForm from './views/SignUp'
  import LoginForm from './views/LoginPage'
  import { auth } from './firebase/init.js'
  import { signOut, onAuthStateChanged } from 'firebase/auth'
  
  export default {
    components: { SignupForm, LoginForm },
    data() {
      return {
        isLoggedIn: false,
        showLogin: true,
        currentUser: null,
      }
    },
    methods: {
      signOut() {
        signOut(auth)
        .then(() => {
          // user signed-out
          this.isLoggedIn = false
          this.showLogin = true
          this.type = null
          this.$router.push({name: "signUP"})
        })
      },
      
    },
    created() {
      onAuthStateChanged(auth, (user) => {
        if (user) {
          // User is signed in
          this.currentUser = user;
          this.type = user.displayName
        } else {
          // User is signed out
          this.currentUser = null;
          this.type = null
        }
      })
    }
    
  }
  </script>
  
