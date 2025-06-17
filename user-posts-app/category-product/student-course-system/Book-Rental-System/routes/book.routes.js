const express = require("express");
const {
    addBook,
    rentBook,
    returnBook,
    getBookRenters,
    updateBook,
    deleteBook
} = require("../controllers/book.controller");

const router = express.Router();

router.post("/add-book", addBook);
router.post("/rent-book", rentBook);
router.post("/return-book", returnBook);
router.get("/book-renters/:bookId", getBookRenters);
router.put("/update-book/:bookId", updateBook);
router.delete("/delete-book/:bookId", deleteBook);

module.exports = router;
