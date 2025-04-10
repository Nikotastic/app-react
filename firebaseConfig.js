import { initializeApp, getApps } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyAUsDNDXZCMGIs4acZOPrKJiofGdZrgkiA",
  authDomain: "devlist-6da83.firebaseapp.com",
  projectId: "devlist-6da83",
  storageBucket: "devlist-6da83.appspot.com",
  messagingSenderId: "18727954547",
  appId: "1:18727954547:web:1e429e5ca724d030f9e206",
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export { auth };
