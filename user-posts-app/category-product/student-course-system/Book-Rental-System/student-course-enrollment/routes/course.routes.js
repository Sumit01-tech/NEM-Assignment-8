const express = require("express");
const {
    addCourse,
    getCourseStudents,
    updateCourse,
    deleteCourse,
} = require("../controllers/course.controller");

const router = express.Router();

router.post("/add-course", addCourse);
router.get("/course-enrollments/:courseId", getCourseStudents);
router.put("/update-course/:courseId", updateCourse);
router.delete("/delete-course/:courseId", deleteCourse);

module.exports = router;
