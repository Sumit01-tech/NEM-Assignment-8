const Course = require("../models/course.model");
const Student = require("../models/student.model");

exports.addCourse = async (req, res) => {
    try {
        const course = new Course(req.body);
        await course.save();
        res.status(201).json({ message: "Course added", course });
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};

exports.enrollStudent = async (req, res) => {
    try {
        const { studentId, courseId } = req.body;

        const student = await Student.findById(studentId);
        const course = await Course.findById(courseId);

        if (!student || !course) {
            return res.status(404).json({ error: "Student or Course not found" });
        }

        // Add references if not already present
        if (!student.enrolledCourses.includes(courseId)) {
            student.enrolledCourses.push(courseId);
            await student.save();
        }

        if (!course.enrolledStudents.includes(studentId)) {
            course.enrolledStudents.push(studentId);
            await course.save();
        }

        res.status(200).json({ message: "Student enrolled successfully" });
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};

exports.getStudentCourses = async (req, res) => {
    try {
        const student = await Student.findById(req.params.id).populate("enrolledCourses", "name");
        if (!student) return res.status(404).json({ error: "Student not found" });

        res.json(student);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.getCourseStudents = async (req, res) => {
    try {
        const course = await Course.findById(req.params.id).populate("enrolledStudents", "name email");
        if (!course) return res.status(404).json({ error: "Course not found" });

        res.json(course);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};
