// importing external modules 
import { initializeApp } from "firebase/app";
import { getDatabase, ref, set, get } from "firebase/database";
import { GoogleAuthProvider, signInWithPopup, getAuth, onAuthStateChanged } from "firebase/auth";


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
let userObject;
async function authStatusCheck(role) {
    return new Promise((resolve) => {
        const unsubscribe = onAuthStateChanged(auth, async (user) => {
            unsubscribe();
            if (!user) {
                resolve(false);
                return;
            }
            if (window.location.pathname.includes('dashboard')) {
                resolve(true);
                return;
            }
            userObject = user;
            const uid = user.uid;
            // Force lowercase to match your DB paths (admin, teacher, student)
            const lowRole = role.toLowerCase(); 
            const dataRef = ref(db, `${lowRole}/${uid}`);

            try {
                const snapshot = await get(dataRef);
                if (snapshot.exists()) {
                    // Use / at the start for absolute pathing
                    window.location.href = `/${lowRole}/dashboard`;
                    resolve(true); 
                }
            } catch (err) {
                console.error("Database error:", err);
                resolve(false);
            }
        });
    });
}



async function weatherExists(user, role) {
    try {
        if (role == `admin`) {
            const adminRef = ref(db, `admin/${user.uid}`);
            const snapshot = get(adminRef);
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
            const studentRef = ref(db, `student/${user.uid}`);
            const snapshot = get(studentRef);
            if (snapshot.exists) {
                return true;
            } else {
                return false;
            }
        }
    } catch (error) {
        console.error(error);
        return true;
    }
}
// getting cookies
async function getAuthUser(){

  const auth = getAuth();

  if(auth.currentUser){
     return Promise.resolve(auth.currentUser);
  }

  return new Promise((resolve,reject)=>{

    const unsubscribe = onAuthStateChanged(auth,(user)=>{

      unsubscribe();

      if(user) resolve(user);
      else reject(new Error("User not authenticated"));

    });

  });

}


// Importing data from firebase 
async function fetchingClassData(teacherUid) {
    const classUidRef = ref(db, `teacher/${teacherUid}/class`);
    const classUidSnapshot = await get(classUidRef);

    if (!classUidSnapshot.exists()) {
        return [];
    } 
    const classUids = Object.keys(classUidSnapshot.val());

    const fetchPromises = classUids.map(async (classId) => {
        const classSnap = await get(ref(db, `class/${classId}`));
        return classSnap.exists() ? classSnap.val() : null;
    });
    const allClassData = await Promise.all(fetchPromises);
    return allClassData.filter(data => data !== null);
}


const authWithFirebase = {
    loginGoogle: loginGoogle,
    authStatusCheck: authStatusCheck,
    weatherExists: weatherExists,
    getAuthUser:getAuthUser,
    fetchingClassData:fetchingClassData,
}

export default authWithFirebase;