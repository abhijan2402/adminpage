// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
    apiKey: "AIzaSyAbl22Z2-VvVrRG8Pml2DdMLIedYbn_O80",
    authDomain: "we-arcade.firebaseapp.com",
    projectId: "we-arcade",
    storageBucket: "we-arcade.appspot.com",
    messagingSenderId: "519744417866",
    appId: "1:519744417866:web:576807697b4761576176b3",
    measurementId: "G-C36GNCRPBK"
};
export const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);

export default app;