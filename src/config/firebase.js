import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyB1wFF6aRPgL20SuTR-516wDI6dWzZKRRU",
  authDomain: "quanti-ukol.firebaseapp.com",
  projectId: "quanti-ukol",
  storageBucket: "quanti-ukol.appspot.com",
  messagingSenderId: "1082734954971",
  appId: "1:1082734954971:web:52822a9f04a9c49064fffe",
};

const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);
