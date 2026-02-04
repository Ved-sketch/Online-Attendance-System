import express from "express";

const router = express.Router();

// teacher
// add, update, delete
router.get("/admin/fetch_teacher",fetchTeachers);
router.post("/admin/add_teacher",addTeacher);
router.put("/admin/:id",updateTeacher);
router.delete("/admin/:id",deleteTeacher);

//students
// add,update,delete
router.get("/admin/student",fetchStudents);
router.post("/admin/add_student",addStudent);
router.put("/admin/:id",updateStudent);
router.delete("/admin/:id",deleteStudent);
