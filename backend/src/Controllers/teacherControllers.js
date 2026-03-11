import { nanoid, random } from 'nanoid';
import Db from '../database&auth/RTDBstruct.js'
import express from 'express';
const app = express();

//  export async function signupUserAPI(data) {

//     const response = await fetch("http://localhost:5000/api/signup", {

//         method: "POST",

//         headers: {
//             "Content-Type": "application/json"
//         },

//         body: JSON.stringify(data)

//     });

//     return response.json();
// }
app.use(express.json()); // this automatically parse string of http req to object

export async function verifyToken(req, res, next) {
    const authHeader = req.headers.authorization;
    if (!authHeader) {
        return res.status(401).json({ error: "No authorization header" });
    }
    const token = authHeader.split(" ")[1];
    if (!token) {
        return res.status(401).json({ error: "No token provided" });
    }
    try {
        const decodedToken = await authAdmin.verifyIdToken(token);
        req.user = decodedToken;
        next();
    } catch (error) {
        return res.status(401).json({error : "Invalid token" });
    }
}

export async function onNewClassCreated(req, res) {
    // const ClassId = nanoid(15);
    try {
        const { courseName, requiredattendance, ClassId } = req.body;
        if (!req.user || !courseName || !ClassId) {
            return res.status(400).json({ error: "Missing required fields" });
        }
        const result = await Db.newClassDb(req.user, courseName, requiredattendance, ClassId);
        console.log(`you have successfully created and registered in class`);
        if (result == true) {
            return res.status(201).json({
                data: result,
                message: "Class created and registered successfully"
            });
        } else {
            return res.status(500).json({error : "Process couldn't be done completely due to some reason" });
        }
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: "Internal Server Error" });
    }
}

export async function onConnectingToAdmin(req, res) {
    try {
        const { adminId } = req.body;
        if (!req.user || !adminId) {
            return res.status(400).json({ error: "Missing required fields" });
        }
        const result = await Db.onConnectingToAdmin(req.user, adminId);
        if (result == true) {
            return res.status(200).json({
                data: result,
                message: `Successfully connected to admin`
            });
        } else {
            return res.status(500).json({error : "Process couldn't be done completely due to some reason" });
        }
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: "Internal Server Error" });
    }
}

export async function onAddTodayAttendance(req, res) {
    try {
        const { classId } = req.body;
        if (classId == null) {
            return res.status(400).json({ error: `Missing required fields` });
        }
        const result = await Db.onAddTodayAttendanceDatabase(classId);
        if (result == true) {
            return res.status(201).json({
                data: result,
                message: `new Attendence created succusfully`
            })
        } else {
            return res.status(500).json({error : "Process couldn't be done completely due to some reason" });
        }
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: "Internal Server Error" });
    }
}

export async function markingAttendance(req, res) {
    try {
        const { studentId, classId } = req.body;
        if (!studentId || !classId) {
            return res.status(400).json({ error: `Missing required fields` });
        }
        const result = await Db.markingAttendanceDatabase(studentId, classId);
        if (result == true) {
            return res.status(200).json({
                data: result,
                message: `successfully marked attendance`
            })
        } else {
            return res.status(500).json({error : "Process couldn't be done completely due to some reason" });
        }
    }
    catch (error) {
        console.error(error);
        return res.status(500).json({ error: "Internal Server Error" });
    }
}

export async function removingStudentFromClass(req, res) {
    try {
        const { studentUserId, classId } = req.body;
        if (!studentUserId || !classId) {
            return res.status(400).json({ error: `Missing required fields` })
        }
        const result = await Db.removingStudentFromClassDatabase(studentUserId, classId);
        if (result == true) {
            return res.status(200).json({
                data: result,
                message: `sucessfully removed the student`
            })
        } else {
            return res.status(500).json({error: "Process couldn't be done completely due to some reason" });
        }
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: "Internal Server Error" });
    }
}

export async function deletionTodaysAttendance(req, res) {
    try {
        const { classId } = req.body;
        if (classId == null) {
            return res.status(400).json({ error: `Missing required fields` })
        }
        const result = await Db.deletionTodaysAttendanceDatabase(classId);
        if (result == true) {
            return res.status(200).json({
                data: result,
                message: `Today's attendance has been deleted successfully`
            })
        } else {
            return res.status(500).json({ error : "Process couldn't be done completely due to some reason" });
        }
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: "Internal Server Error" });
    }
}

  