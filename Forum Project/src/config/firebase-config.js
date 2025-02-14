import { initializeApp } from "firebase/app";
import { getAuth } from 'firebase/auth';
import { getDatabase } from 'firebase/database';

const firebaseConfig = {
  apiKey: "AIzaSyDFbe_fq0T_9Ve1jEv_TbZ9xb-yXbaWrBU",
  authDomain: "a67-not-a-twitter.firebaseapp.com",
  projectId: "a67-not-a-twitter",
  storageBucket: "a67-not-a-twitter.firebasestorage.app",
  messagingSenderId: "458931369831",
  appId: "1:458931369831:web:fca31a09791d7173f5a1c2",
  databaseURL: "https://forum-64b81-default-rtdb.europe-west1.firebasedatabase.app/"};

export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getDatabase(app);
