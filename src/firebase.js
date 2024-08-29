// src/firebase.js
import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage'; // Import getStorage

const firebaseConfig = {
  apiKey: "AIzaSyDGuE76aQ-CgOBBls8ptNLsGKlRVWFFO68",
  authDomain: "financeiro-ab739.firebaseapp.com",
  projectId: "financeiro-ab739",
  storageBucket: "financeiro-ab739.appspot.com",
  messagingSenderId: "889337048163",
  appId: "1:889337048163:web:bc95d1a286c4fc07215c56"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const storage = getStorage(app); // Initialize storage

export { db, storage }; // Export storage
