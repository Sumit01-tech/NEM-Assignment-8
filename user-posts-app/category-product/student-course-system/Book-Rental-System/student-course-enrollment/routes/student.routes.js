const express = require("express");
const {
    addStudent,
    enrollStudent,
    unenrollStudent,
    getStudentCourses,
} = require("../controllers/student.controller");

const router = express.Router();

router.post("/add-student", addStudent);
router.post("/enroll-student", enrollStudent);
router.post("/unenroll-student", unenrollStudent);
router.get("/student-courses/:studentId", getStudentCourses);

module.exports = router;
