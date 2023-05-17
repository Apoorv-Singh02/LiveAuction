import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getDatabase } from "firebase/database";

const firebaseConfig = {
  apiKey: "AIzaSyDVyRBVvubj2N3PxRA1UtUJekSEMPMPXns",
  authDomain: "liveauction-d1e9d.firebaseapp.com",
  projectId: "liveauction-d1e9d",
  storageBucket: "liveauction-d1e9d.appspot.com",
  messagingSenderId: "338387433812",
  appId: "1:338387433812:web:2b4f0848f9dd9e8177f0c1",
  measurementId: "G-JBH07604P6",
  databaseURL:"https://liveauction-d1e9d-default-rtdb.firebaseio.com"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getDatabase(app);

export { auth, db }