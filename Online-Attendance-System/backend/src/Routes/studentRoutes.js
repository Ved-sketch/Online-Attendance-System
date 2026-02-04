import express from "express";

const router = express.Router();

router.get("/",showAttendance);
router.get("/student/subject_wise_attendance",showSubjectWiseAttendance);