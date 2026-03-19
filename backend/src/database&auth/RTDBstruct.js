// importing external modules 
// import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
// import { getDatabase, ref, set, get, update, remove, runTransaction, Promise, onValue } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-database.js";
// import { GoogleAuthProvider, signInWithPopup, getAuth, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";

import { db } from '../config/firebaseAdmin.js'

// const firebaseConfig = {
//     apiKey: "AIzaSyBkCgj3_3_e5JppMu3ByFU1vprv3HT8coA",
//     authDomain: "attendance-tracker-29324.firebaseapp.com",
//     projectId: "attendance-tracker-29324",
//     storageBucket: "attendance-tracker-29324.firebasestorage.app",
//     messagingSenderId: "1066797653254",
//     appId: "1:1066797653254:web:c5fe784d3e8bf4700c1287",
//     measurementId: "G-BKWD3X7GF7"
// }

// const app = initializeApp(firebaseConfig);
// const auth = getAuth(app);
// const db = getDatabase(app);
// const provider = new GoogleAuthProvider();


// save to User database side
async function saveUserToRTDB(user, role, personalInfo) {
    const userRef = db.ref("users/" + user.uid);
    // const idToken = await user.getIdToken();
    // const notfToken = await user.getToken();
    const userData = {
        id: user.uid,
        role: role,
        name: user.name,
        email: user.email,
        picture : user.picture,
        session: "2025-2029"
    };
    // console.log("Auth state:", auth.currentUser);
    await userRef.set(userData);
    if (role == 'admin') {
        // adminDatabase
        const adminRef = db.ref(`admin/${user.uid}`);
        try {
            const snapshot = await adminRef.once('value');
            if (snapshot.exists()) {
                return false;
            }
            else {
                return await adminDatabase(user, personalInfo);
            }
        } catch (error) {
            console.error(error);
            return false;
        }

    } else if (role == 'Teacher') {
        // teacher role
        const teacherRef = db.ref(`teacher/${user.uid}`);
        try {
            const snapshot = await teacherRef.once('value');
            if (snapshot.exists()) {
                return false;
            }
            else {
                return await teacherDatabase(user, personalInfo);
            }
        } catch (error) {
            console.error(error);
            return false;
        }
    } else if (role == 'Student') {
        const studentRef = db.ref(`student/${user.uid}`);
        try {
            const snapshot = await studentRef.once('value');
            if (snapshot.exists()) {
                return false;
            }
            else {
                return await studentDatabase(user, personalInfo);
            }
        } catch (error) {
            console.error(error);
            return false;
        }

    }
}

//                                        /-------------------\
//************************************** / Admin side Database \  *****************************
//                                      +-----------------------+
async function adminDatabase(user, personalInfo) {
    try {
        const adminRef = db.ref(`admin/${user.uid}`);
        const adminData = {
            instituteName: personalInfo.instituteName,
            adminName: personalInfo.adminName,
            role: 'admin',
            teacher: {}
        }
        await adminRef.set(adminData);
        return true
    } catch (error) {
        console.error(`adminDatabase ${error}`);
        return false;
    }
}



//                                          \=======================/
//------------------------------------------| Teacher side Database |-------------------------------------------------------
//                                          /=======================\
// adding teacher in db                      
async function teacherDatabase(user, personalInfo) {
    try {
        const teacherRef = db.ref(`teacher/${user.uid}`);
        const teacherData = {
            id: personalInfo.id,
            name: personalInfo.name,
            role: 'teacher',
            admin: 1234,
            class: {}
        }
        await teacherRef.set(teacherData);
        return true;
    } catch (error) {
        console.error(`teacherDatabase ${error}`);
        return false;
    }
}

// adding new class 
async function newClassDb(user, courseName, requiredattendance, randomClassId) {
    try {
        const classRef = db.ref(`class/${randomClassId}`);
        const classData = {
            classId: randomClassId,
            teacherId: user.uid,
            courseName: courseName,
            requiredattendance: requiredattendance,
            student: {},
            attendance: {}
        }
        await classRef.set(classData);
        const teacherClassRef = db.ref(`teacher/${user.uid}/class`);
        await teacherClassRef.update({ [randomClassId]: true });
        return true;
    } catch (error) {
        console.error(`newClassDb ${error}`);
        return false;
    }
}

//removing class
async function deleteClass(user, classId) {
    try {
        const classRef = db.ref(`class/${classId}`);
        const teacherClassRef = db.ref(`teacher/${user.uid}/class/${classId}`);

        await Promise.all([
            classRef.remove(),
            teacherClassRef.remove()
        ])
        return true;
    } catch (error) {
        console.error(`deleteClass ${error}`);
        return false;
    }
}

// connecting teacher to admin
async function onConnectingToAdmin(user, adminId) {
    try {
        const admineExistingref = db.ref(`admin/${adminId}`);
        const snapshot = await admineExistingref.once(`value`);
        if(!snapshot.exists()){
            return false;
        }
        const adminRef = db.ref(`admin/${adminId}/teacher`);
        const teacherAdminRef = db.ref(`teacher/${user.uid}/admin`);
        await Promise.all([
            adminRef.update({ [user.uid]: true }),
            teacherAdminRef.set(adminId)
        ])
        return true;
    } catch (error) {
        console.error(`onConnectingToAdmin ${error}`);
        return false;
    }
}

// Todays attendance building
async function onAddTodayAttendanceDatabase(classId) {
    try {
        const classRef = db.ref(`class/${classId}`);
        const classSnapshot = await classRef.once('value');
        if (classSnapshot.exists()) {
            const classData = classSnapshot.val();
            const dateStr = `${new Date().getDate()}-${new Date().getMonth() + 1}-${new Date().getFullYear()}`;

            if (classData.attendance && classData.attendance[dateStr]) {
                return false;
            }
            const studentListObj = classData.student || {};
            const attendanceData = {};
            Object.keys(studentListObj).forEach(uid => {
                attendanceData[uid] = false;
            });
            await classRef.child('attendance').child(dateStr).set(attendanceData);
            return true;
        }
        return false;
    } catch (error) {
        console.error(`onAddTodayAttendanceDatabase ${error}`);
        return false;
    }
}


// Deleting todays attendance 
async function deletionTodaysAttendanceDatabase(classId) {
    try {
        const today = new Date();
        const year = today.getFullYear();
        const month = today.getMonth() + 1;
        const day = today.getDate();
        const dateStr = `${day}-${month}-${year}`
        const attendanceRef = db.ref(`class/${classId}/attendance/${dateStr}`);
        await attendanceRef.remove();
        return true;
    }
    catch (error) {
        console.log(`${error}`);
        return false;
    }
}

// marking present and absent
async function markingAttendanceDatabase(studentId, classId) {
    try {
        const today = new Date();
        const year = today.getFullYear();
        const month = today.getMonth() + 1;
        const day = today.getDate();
        const dateStr = `${day}-${month}-${year}`
        const studentStatusRef = db.ref(`class/${classId}/attendance/${dateStr}/${studentId}`);
        await studentStatusRef.transaction((currentvalue) => {
            if (currentvalue == null) {
                return true;
            }
            return !currentvalue;
        });
        return true;
    } catch (error) {
        console.error(`markingAttendanceDatabase ${error}`);
        return false;
    }
}

// finding total student present today
function listenToAttendance(classId) {
    const today = new Date();
    const dateStr = `${today.getDate()}-${today.getMonth() + 1}-${today.getFullYear()}`;
    const attendanceRef = db.ref(`class/${classId}/attendance/${dateStr}`);
    onValue(attendanceRef, (snapshot) => {
        const data = snapshot.val();
        if (data) {
            const presentCount = Object.values(data).filter(status => status === true).length;
            const totalStudents = Object.keys(data).length;
            console.log(`Present: ${presentCount} / Total: ${totalStudents}`);
            // updateCounterUI(presentCount, totalStudents);
        }
    });
}

// Removing student from class
async function removingStudentFromClassDatabase(studentUserId, classId) {
    try {
        const today = new Date();

        const dateStr = `${today.getDate()}-${today.getMonth() + 1}-${today.getFullYear()}`;
        const classStudentRef = db.ref(`class/${classId}/student/${studentUserId}`);

        const studentProfileRef = db.ref(`student/${studentUserId}/class/${classId}`);

        const todaysStudentAttendanceRef = db.ref(`class/${classId}/attendance/${dateStr}/${studentUserId}`);

        await Promise.all([
            classStudentRef.remove(),
            studentProfileRef.remove(),
            todaysStudentAttendanceRef.remove()
        ]);
        return true;
    } catch (error) {
        console.error("removingStudentFromClassDatabase", error);
        return false;
    }
}


//                                       '₹₹₹₹₹₹₹₹₹₹₹₹₹₹₹₹₹₹₹₹₹₹₹'
//++++++++++++++++++++++++++++++++++++++ { Student side Database  } ++++++++++++++++++++++++++++++++++++++++++++++++++
// saving user info                      '$$$$$$$$$$$$$$$$$$$$$$$'
async function studentDatabase(user, personalInfo) {
    try {
        const studentRef = db.ref(`student/${user.uid}`);
        const studentData = {
            id: personalInfo.id,
            name: personalInfo.name,
            role: 'student',
            class: {}
        }
        await studentRef.set(studentData);
    } catch (error) {
        console(`studentDatabase ${error}`);
        return false;
    }
}

// connecting to new class
async function onNewClassAddDatabase(user, classId) {
    try {
        const classRef = db.ref(`class/${classId}`);
        const snapshot = await classRef.once('value');
        if (snapshot.exists()) {
            const classStudentRef = db.ref(`class/${classId}/student/${user.uid}`);
            const studentRef = db.ref(`student/${user.uid}/class/${classId}`);
            await Promise.all([
                classStudentRef.set(true),
                studentRef.set(true)
            ])
            return true;
        }
    } catch (error) {
        console.error(`onNewClassAddDatabase ${error}`);
        return false;
    }
}

// Leaving the class
async function leavingClassDatabase(user, classId) {
    try {
        const studentRef = db.ref(`student/${user.uid}/class/${classId}`);
        await studentRef.remove();
        return true;
    } catch (error) {
        console.error(`leavingClassDatabase ${error}`);
        return false;
    }
}

//exporting db functions
const DB = {
    leavingClassDatabase: leavingClassDatabase,
    deleteClass: deleteClass,
    markingAttendanceDatabase: markingAttendanceDatabase,
    onAddTodayAttendanceDatabase: onAddTodayAttendanceDatabase,
    onConnectingToAdmin: onConnectingToAdmin,
    onNewClassAddDatabase: onNewClassAddDatabase,
    saveUserToRTDB: saveUserToRTDB,
    newClassDb: newClassDb,
    removingStudentFromClassDatabase: removingStudentFromClassDatabase,
    deletionTodaysAttendanceDatabase: deletionTodaysAttendanceDatabase,
}

export default DB;