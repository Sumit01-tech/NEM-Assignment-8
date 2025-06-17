const express = require("express");
const {
    addBook, borrowBook, returnBook,
    getBookBorrowers, updateBook, deleteBook
} = require("../controllers/book.controller");

const router = express.Router();

router.post("/add-book", addBook);
router.post("/borrow-book", borrowBook);
router.post("/return-book", returnBook);
router.get("/book-borrowers/:bookId", getBookBorrowers);
router.put("/update-book/:bookId", updateBook);
router.delete("/delete-book/:bookId", deleteBook);

module.exports = router;
