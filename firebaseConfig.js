// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCg6gCVMoOQBfrg_apU8txgeXlwjE5VimY",
  authDomain: "devlist-55780.firebaseapp.com",
  projectId: "devlist-55780",
  storageBucket: "devlist-55780.firebasestorage.app",
  messagingSenderId: "830348934929",
  appId: "1:830348934929:web:69b026926f0046870716b0",
  measurementId: "G-JY5M32DB1V"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export { auth };

//android 755391250795-0bl18ojbej0dk2kcu46045g2vvk34vli.apps.googleusercontent.com


