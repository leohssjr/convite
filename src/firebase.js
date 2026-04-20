import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";

const firebaseConfig = {
  apiKey: "AIzaSyDPVjSlGwsDLuwyZW-llBja2GpsbrejUpk",
  authDomain: "convite-cha-casa-laury.firebaseapp.com",
  databaseURL: "https://convite-cha-casa-laury-default-rtdb.firebaseio.com",
  projectId: "convite-cha-casa-laury",
  storageBucket: "convite-cha-casa-laury.firebasestorage.app",
  messagingSenderId: "979460158164",
  appId: "1:979460158164:web:ad211558799708f45a4141",
  measurementId: "G-7RZJWN361X"
};

const app = initializeApp(firebaseConfig);
export const db = getDatabase(app);
