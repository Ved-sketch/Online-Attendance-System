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

// checking existing user
async function weatherExists(user, role) {
    try {
        if (role == `admin`) {
            const adminRef = ref(db, `admin/${user.uid}`);
            const sanpshot = get(adminRef);
            if (snapshot.exists) {
                return true;
            } else {
                return false;
            }
        } else if (role == `Teacher`) {
            const teacherRef = ref(db, `teacher/${user.uid}`);
            const snapshot = get(teacherRef);
            if (snapshot.exists) {
                return true;
            } else {
                return false;
            }
        } else if (role == `Student`) {
            const studentRef = ref(db,`student/${user.uid}`);
            const snapshot = get(studentRef);
            if (snapshot.exists) {
                return true;
            } else {
                return false;
            }
        }
    } catch (error) {
        console.error(error);
        return false;
    }
}

const authWithFirebase = {
    loginGoogle: loginGoogle,
    authStatusCheck: authStatusCheck,
    weatherExists: weatherExists,
}

export default authWithFirebase;