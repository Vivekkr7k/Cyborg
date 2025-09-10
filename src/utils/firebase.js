// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBS-lXNExt4u5CuWBeXvFw",
  authDomain: "cyborgweb-32baseapp.com",
  projectId: "cyborgweb-32ba7",
  storageBucket: "cyborgwasestorage.app",
  messagingSenderId: "630295",
  appId: "1:630229978195:web:1d90cf2eb8aedf8aa6",
  measurementId: "G7L9XXS8SL"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export { RecaptchaVerifier };
