// importing external modules 
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import { getDatabase, ref, set, get } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-database.js";
import { GoogleAuthProvider, signInWithPopup, getAuth, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";

const firebaseConfig = {
    apiKey: "AIzaSyBkCgj3_3_e5JppMu3ByFU1vprv3HT8coA",
    authDomain: "attendance-tracker-29324.firebaseapp.com",
    projectId: "attendance-tracker-29324",
    storageBucket: "attendance-tracker-29324.firebasestorage.app",
    messagingSenderId: "1066797653254",
    appId: "1:1066797653254:web:c5fe784d3e8bf4700c1287",
    measurementId: "G-BKWD3X7GF7"
}

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getDatabase(app);
const provider = new GoogleAuthProvider();
const role = ['student', 'teacher', 'admin'];

async function saveUserToRTDB(user) {
    const userRef = ref(db, "users/" + user.uid);
    const idToken = await user.getIdToken();
    const userData = {
      id: user.uid,
      role:role[2],
      name: user.displayName,
      email: user.email,     
      session: "2025-2029",
      token: idToken
    };
    set(userRef, userData);
    }

    const DB = {
        saveUserToRTDB : saveUserToRTDB,
    }

export default DB;