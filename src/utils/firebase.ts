// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getStorage} from "firebase/storage"




const firebaseConfig = {
  apiKey: "AIzaSyAUDLh7VqpgaHN6SEiAG8cxDmtVzFKqA7A",
  authDomain: "altomaxx-c002e.firebaseapp.com",
  projectId: "altomaxx-c002e",
  storageBucket: "altomaxx-c002e.appspot.com",
  messagingSenderId: "14222288282",
  appId: "1:14222288282:web:fd83ab02cd36ff998d0623"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const storage = getStorage(app)