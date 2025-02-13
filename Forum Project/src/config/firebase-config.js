// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDFbe_fq0T_9Ve1jEv_TbZ9xb-yXbaWrBU",
  authDomain: "forum-64b81.firebaseapp.com",
  projectId: "forum-64b81",
  storageBucket: "forum-64b81.firebasestorage.app",
  messagingSenderId: "1001058422129",
  appId: "1:1001058422129:web:6fb09e104639d205053ad0",
  measurementId: "G-64WRXCQ5HG",
  databaseURL: "https://forum-64b81-default-rtdb.europe-west1.firebasedatabase.app/"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);