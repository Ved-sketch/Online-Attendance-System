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

// Get class details with students
router.get("/teacher/class/:classId", getClassDetails);

// Attendance routes
router.post("/teacher/attendance", takeAttendance);
router.get("/teacher/attendance", checkAttendance);

// Statistics and student management
router.get("/teacher/check_stats", showStats);
router.get("/teacher/:id", showStudent);
router.post("/teacher/add_student", addStudent);
router.delete("/teacher/:id", deleteStudent);
router.get("/teacher/download_stats", downloadStats);
router.get("/teacher/sort", sortStudents);
router.get("/teacher/showSchedule", showSchedule);

module.exports = router;