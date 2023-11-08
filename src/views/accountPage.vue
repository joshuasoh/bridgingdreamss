<template>
    <div class="px-4 py-5 px-md-5 text-center text-lg-start" style="background-color: hsl(0, 0%, 96%)">
        <div class="container">
            <div class="row gx-lg-5 align-items-center">
                <!-- Our Vision -->
                <div class="col-lg-6 mb-5 mb-lg-0 order-lg-0 order-1">
                    <h1 class="my-5 display-3 fw-bold ls-tight">
                        Bridging Dreams <br />
                        <span class="text-primary">One Lesson at a Time</span>
                    </h1>
                    <p style="color: hsl(217, 10%, 50.8%)">
                        In the vibrant heart of Singapore, where opportunity and prosperity often grace the lives of the fortunate,
                        we discovered a hidden truth: the untapped brilliance within low-income families yearning for a chance to shine.
                        In this city, like many others, educational inequality casts a shadow over the dreams of many children.

                        <br><br>
                        In response, we set forth on a mission called "Bridging Dreams." We envisioned a Singapore where every child,
                        regardless of their background, could access quality education. We recognized the disparities – better schools
                        for the privileged, the burden of competition, and the challenges faced by hardworking parents.

                        <br><br>

                        "Bridging Dreams" is more than just a website; it's a lifeline for those whose dreams are dimmed by circumstance.
                        Our platform connects low-income families with dedicated volunteer tutors who inspire and teach. Families find tutors
                        tailored to their needs, and tutors share their qualifications and expertise.

                        <br><br>
                        Join us in "Bridging Dreams", and help us create a brighter, more equal Singapore for all.
                    </p>
                </div>
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
            </div>
        </div>
    </div>

  </template>
  
  <script>
    //   import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth'
    import SignupForm from './SignUp.vue'
    import LoginForm from './LoginPage.vue'
    import { auth } from '../firebase/init.js'
    import {signInWithEmailAndPassword, createUserWithEmailAndPassword, updateProfile } from 'firebase/auth'

  export default {
    //emits: ['loggedIn'],
    components: { SignupForm, LoginForm },
    data() {
      return {
        loginForm: {
            email: '',
            password: ''
        },

        signupForm: {
            email: '',
            password: '',
            type: 'parent'
        },
        isLoggedIn: false,
        showLogin: true,
        currentUser: null,
        formType: 'login'
      }
    },
    methods: {
        signUp() {
            // register new user
            createUserWithEmailAndPassword(auth,this.signupForm.email,this.signupForm.password)
            .then((credential) => {
            // registered and signed in
            
            updateProfile(auth.currentUser, {
                displayName: this.signupForm.type
            })
            this.$router.push({name: "home"})
            console.log(credential.user)
            })

            .catch((error) => {
            console.log(error.message)
            alert(error.message)
            })
        },

        toggleForm(formType){
            this.formType = formType
        },
        login() {
            // login user
            signInWithEmailAndPassword(auth,this.loginForm.email,this.loginForm.password)
            .then(() => {
                // emit event for member area
                this.$router.push({name: "home"})
            })
            .catch((error) => {
                switch(error.code) {
                default:
                    error.code = "Email or Password was incorrect. Please check it again!"
                }
                alert(error.code)
            })
        }
    },
    created(){
        // var user = auth.currentUser
        // console.log(user)
        
    }
  }
  
  </script>