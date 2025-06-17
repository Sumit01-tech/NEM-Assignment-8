const Member = require("../models/member.model");

exports.addMember = async (req, res) => {
    try {
        const member = await Member.create(req.body);
        res.status(201).json(member);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};

exports.getMemberBorrowedBooks = async (req, res) => {
    try {
        const member = await Member.findById(req.params.memberId).populate("borrowedBooks", "title author status");
        res.json(member || { error: "Not found" });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};
