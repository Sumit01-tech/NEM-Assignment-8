const express = require("express");
const { addCourse, enrollStudent, getCourseStudents } = require("../controllers/course.controller");
const router = express.Router();

router.post("/add-course", addCourse);
router.post("/enroll-student", enrollStudent);
router.get("/course/:id/students", getCourseStudents);

module.exports = router;
