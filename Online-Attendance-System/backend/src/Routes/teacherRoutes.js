import express from "express";

const router = express.Router();

router.post("/teacher/attendance",takeAttendance);
router.get("/teacher/attendance",checkAttendance);
router.get("/teacher/check_stats",showStats);
router.get("/teacher/:id",showStudent);
router.post("/teacher/add_student",addStudent);
router.delete("/teacher/delete_student",deleteStudent);
router.get("/teacher/download_stats",downloadStats);
router.get("/teacher/sort",sortStudents);
router.get("/teacher/showSchedule",showSchedule);