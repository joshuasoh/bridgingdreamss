import { initializeApp } from "firebase/app"
import {getFirestore} from 'firebase/firestore'
import {getAuth} from 'firebase/auth'
import {getStorage } from 'firebase/storage'

const firebaseConfig = {
    apiKey: "AIzaSyB54hgTdM9EmhuKj5AWb7NldgckvcWL40M",
    authDomain: "free-me-121bf.firebaseapp.com",
    projectId: "free-me-121bf",
    storageBucket: "free-me-121bf.appspot.com",
    messagingSenderId: "228535039927",
    appId: "1:228535039927:web:f49d5f45fba99047beda32",
    measurementId: "G-7EYWW0808Q"
  };
  
// Initialize Firebase
 const app = initializeApp(firebaseConfig);

// init firestore service
export const db = getFirestore()


// generate  & export auth object
export const auth = getAuth()
export const storage = getStorage(app)
