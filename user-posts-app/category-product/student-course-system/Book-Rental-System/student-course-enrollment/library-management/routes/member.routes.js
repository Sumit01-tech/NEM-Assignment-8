const express = require("express");
const { addMember, getMemberBorrowedBooks } = require("../controllers/member.controller");
const router = express.Router();

router.post("/add-member", addMember);
router.get("/member-borrowed-books/:memberId", getMemberBorrowedBooks);

module.exports = router;
