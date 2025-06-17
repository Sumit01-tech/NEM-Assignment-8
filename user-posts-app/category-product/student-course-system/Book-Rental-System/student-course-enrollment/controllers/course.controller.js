const Course = require("../models/course.model");
const Student = require("../models/student.model");

exports.addCourse = async (req, res) => {
    try {
        const course = await Course.create(req.body);
        res.status(201).json(course);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};

exports.getCourseStudents = async (req, res) => {
    try {
        const course = await Course.findById(req.params.courseId).populate("studentsEnrolled");
        if (!course) return res.status(404).json({ error: "Course not found" });
        res.json(course);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.updateCourse = async (req, res) => {
    try {
        const course = await Course.findByIdAndUpdate(req.params.courseId, req.body, { new: true });
        if (!course) return res.status(404).json({ error: "Course not found" });
        res.json(course);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};

exports.deleteCourse = async (req, res) => {
    try {
        const course = await Course.findByIdAndDelete(req.params.courseId);
        if (!course) return res.status(404).json({ error: "Course not found" });

        await Student.updateMany(
            { enrolledCourses: course._id },
            { $pull: { enrolledCourses: course._id } }
        );

        res.json({ message: "Course deleted and removed from all students" });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};
