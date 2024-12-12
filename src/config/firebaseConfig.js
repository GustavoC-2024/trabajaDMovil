import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
    apiKey: "AIzaSyBbQbuzmPzFqBd-FQ-gIAi_MZfJSFH2ZRE",
    authDomain: "movil-aa16e.firebaseapp.com",
    projectId: "movil-aa16e",
    storageBucket: "movil-aa16e.firebasestorage.app",
    messagingSenderId: "181882187968",
    appId: "1:181882187968:web:9d8afd1e1941832650fd25"
  };

  const app = initializeApp(firebaseConfig);
  const auth = getAuth(app);
  export { auth };