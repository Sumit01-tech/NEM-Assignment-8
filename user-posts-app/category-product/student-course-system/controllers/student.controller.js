const Student = require("../models/student.model");

// Add Student controller
exports.addStudent = async (req, res) => {
    try {
        const { name, email, enrolledCourses } = req.body;
        const student = new Student({ name, email, enrolledCourses });
        await student.save();
        res.status(201).json({ message: "Student added", student });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// Get Student Courses controller
exports.getStudentCourses = async (req, res) => {
    try {
        const student = await Student.findById(req.params.id).populate("enrolledCourses", "name");
        if (!student) return res.status(404).json({ error: "Student not found" });
        res.json(student);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};
