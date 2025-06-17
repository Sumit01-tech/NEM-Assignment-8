const express = require("express");
const { addStudent, getStudentCourses } = require("../controllers/student.controller");
const router = express.Router();

console.log("getStudentCourses: ", getStudentCourses);

router.post("/add-student", addStudent);
router.get("/student/:id/courses", getStudentCourses);

module.exports = router;
