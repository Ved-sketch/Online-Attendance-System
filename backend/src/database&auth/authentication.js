// importing external modules 
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import { getDatabase, ref, set, get } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-database.js";
import { GoogleAuthProvider, signInWithPopup, getAuth, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";
import DB from './RTDBstruct';

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

// Signup and login with google;
async function loginGoogle() {
    try {
        const result = await signInWithPopup(auth, provider);
        const user = result.user;
        console.log(user);
        return user;
    }
    catch (error) {
        console.error(error);
    };
}

// Checking for need of authentication 
async function authStatusCheck() {
    onAuthStateChanged(auth, async (user) => {
        if (!user) return;

        const uid = user.uid;
        const userRef = ref(db, "users/" + uid);
        const snapshot = await get(userRef);

        if (snapshot.exists()) {
            redirectBasedOnRole(snapshot.val().role);
        } else {
            showRoleSelectionPage();
        }
    });
}


const authWithFirebase = {
    loginGoogle: loginGoogle,
    authStatusCheck: authStatusCheck
}

export default authWithFirebase;
