import { initializeApp } from "firebase/app";
import { getStorage } from 'firebase/storage';

const firebaseConfig = {
    apiKey: "AIzaSyBslhiEKPoER1AkzQQbElM90LqqnUzI3sk",
    authDomain: "socialcubing.firebaseapp.com",
    projectId: "socialcubing",
    storageBucket: "socialcubing.appspot.com",
    messagingSenderId: "908384809010",
    appId: "1:908384809010:web:f6d0aad2e5e449b94d0c2b",
    measurementId: "G-K48H8STNP4"
};

const app = initializeApp(firebaseConfig);
export const storage = getStorage(app);