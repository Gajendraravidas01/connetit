import { initializeApp } from "firebase/app";
import {getAuth} from "firebase/auth";
import { getStorage} from "firebase/storage";
import {getFirestore} from 'firebase/firestore';


const firebaseConfig = {
  apiKey: "AIzaSyBeH5ZWlePMA5NyRv6vzoDJdo8yzO1sDZ4",
  authDomain: "youandme-5e7fd.firebaseapp.com",
  projectId: "youandme-5e7fd",
  storageBucket: "youandme-5e7fd.appspot.com",
  messagingSenderId: "393792838302",
  appId: "1:393792838302:web:a50a60a3c85ce65e5a798f"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth = getAuth();
export const storage = getStorage();
export const db = getFirestore();
