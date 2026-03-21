const express = require("express");
const {
  getClassDetails,
  takeAttendance,
  checkAttendance,
  showStats,
  showStudent,
  addStudent,
  deleteStudent,
  downloadStats,
  sortStudents,
  showSchedule
} = require("../Controllers/teacherControllers");

const router = express.Router();
import {verifyToken,onNewClassCreated,onConnectingToAdmin,onAddTodayAttendance,markingAttendance,removingStudentFromClass,deletionTodaysAttendance,onDeleteClass} from '../Controllers/teacherControllers.js';
router.post('/new-class',verifyToken,onNewClassCreated );
router.post(`/deletion-class`,verifyToken,onDeleteClass)
router.post('/admin-connection',verifyToken,onConnectingToAdmin);
router.post('/today-attendance',onAddTodayAttendance);
router.post('/marking-attendance',markingAttendance);
router.post('/removing-student',removingStudentFromClass);
router.post('/deletion-attendance',deletionTodaysAttendance);
export default router;