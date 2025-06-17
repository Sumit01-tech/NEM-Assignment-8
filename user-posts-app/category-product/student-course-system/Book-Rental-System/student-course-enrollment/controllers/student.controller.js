const Student = require("../models/student.model");
const Course = require("../models/course.model");

exports.addStudent = async (req, res) => {
    try {
        const student = await Student.create(req.body);
        res.status(201).json(student);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};

exports.getStudentCourses = async (req, res) => {
    try {
        const student = await Student.findById(req.params.studentId).populate("enrolledCourses");
        if (!student) return res.status(404).json({ error: "Student not found" });
        res.json(student);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.enrollStudent = async (req, res) => {
    const { studentId, courseId } = req.body;
    try {
        const student = await Student.findById(studentId);
        const course = await Course.findById(courseId);

        if (!student || !course) return res.status(404).json({ error: "Student or Course not found" });

        if (!student.enrolledCourses.includes(courseId)) {
            student.enrolledCourses.push(courseId);
            await student.save();
        }

        if (!course.studentsEnrolled.includes(studentId)) {
            course.studentsEnrolled.push(studentId);
            await course.save();
        }

        res.json({ message: "Student enrolled successfully" });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.unenrollStudent = async (req, res) => {
    const { studentId, courseId } = req.body;
    try {
        await Student.findByIdAndUpdate(studentId, { $pull: { enrolledCourses: courseId } });
        await Course.findByIdAndUpdate(courseId, { $pull: { studentsEnrolled: studentId } });
        res.json({ message: "Student unenrolled successfully" });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};
