import express from "express";

const router = express.Router();

// teacher
// add, update, delete
router.get("/admin/fetch_teacher",fetchTeachers);
router.post("/admin/add_teacher",addTeacher);
router.put("/admin/update_teacher",updateTeacher);
router.delete("/admin/delete_teacher",deleteTeacher);

//students
// add,update,delete
router.get("/admin/student",fetchStudents);
router.post("/admin/add_student",addStudent);
router.put("/admin/update_student",updateStudent);
router.delete("/admin/delete_student",deleteStudent);
