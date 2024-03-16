// Import the functions you need from the SDKs you need
import React, { useState } from 'react';
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import {getAuth} from "firebase/auth";

import {  createUserWithEmailAndPassword, signInWithEmailAndPassword  } from 'firebase/auth';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyA4Qhg4AmTlBhiMVj7DCUsi1Gc7j4cEnB8",
  authDomain: "connect4-a3078.firebaseapp.com",
  projectId: "connect4-a3078",
  storageBucket: "connect4-a3078.appspot.com",
  messagingSenderId: "243594584121",
  appId: "1:243594584121:web:5368b03d1b2e7d3cd8ade8",
  measurementId: "G-RFCMT0V3S0"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);




const SignIn = () => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('');
 
    const onSubmit = async (e) => {
      e.preventDefault()
     
      await createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            const user = userCredential.user;
            console.log(user);


        })
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            console.log(errorCode, errorMessage);

        });
 
   
    }}
export default app;


