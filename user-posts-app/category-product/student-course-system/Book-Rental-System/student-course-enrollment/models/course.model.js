const mongoose = require("mongoose");

const courseSchema = new mongoose.Schema({
    title: { type: String, required: true, minlength: 3 },
    description: { type: String },
    instructor: { type: String, required: true },
    studentsEnrolled: [{ type: mongoose.Schema.Types.ObjectId, ref: "Student" }]
});

module.exports = mongoose.model("Course", courseSchema);
