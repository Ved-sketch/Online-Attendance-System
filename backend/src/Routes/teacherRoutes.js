import express from 'express'
const router = express.Router();
import {verifyToken,onNewClassCreated,onConnectingToAdmin,onAddTodayAttendance,markingAttendance,removingStudentFromClass,deletionTodaysAttendance} from '../Controllers/teacherControllers.js';
router.post('/new-class',verifyToken,onNewClassCreated );
router.post('/admin-connection',verifyToken,onConnectingToAdmin);
router.post('/today-attendance',onAddTodayAttendance);
router.post('/marking-attendance',markingAttendance);
router.post('/removing-student',removingStudentFromClass);
router.post('/deletion-attendance',deletionTodaysAttendance);
export default router;