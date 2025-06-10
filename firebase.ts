import { getApps, initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
import { getAuth } from "firebase/auth";


const firebaseConfig = {
    apiKey: "AIzaSyD2HhkUzKFJ5o5e3VIu48tYsTs341Vjd24",
    authDomain: "talkativepdf-anirudh.firebaseapp.com",
    projectId: "talkativepdf-anirudh",
    storageBucket: "talkativepdf-anirudh.firebasestorage.app",
    messagingSenderId: "543931428209",
    appId: "1:543931428209:web:665bf0aa311082144f1ad0",
    measurementId: "G-JT0JHXC4WS"
  };
  
  

const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApps();

const db = getFirestore(app);
const storage = getStorage(app);

export { db , storage };
