const mongoose = require("mongoose");

const bookSchema = new mongoose.Schema({
    title: { type: String, required: true, minlength: 3 },
    author: { type: String, required: true },
    status: { type: String, enum: ["available", "borrowed"], default: "available" },
    borrowers: [{ type: mongoose.Schema.Types.ObjectId, ref: "Member" }],
    createdAt: { type: Date, default: Date.now }
});

bookSchema.pre("save", function (next) {
    if (this.isModified("borrowers") && this.borrowers.length > 0 && this.status !== "available") {
        return next(new Error("Book must be available to borrow."));
    }
    next();
});

bookSchema.post("findOneAndUpdate", async function (doc) {
    if (doc.borrowers.length === 0 && doc.status !== "available") {
        doc.status = "available";
        await doc.save();
    }
});

module.exports = mongoose.model("Book", bookSchema);
