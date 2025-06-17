const Book = require("../models/book.model");
const User = require("../models/user.model");

exports.addBook = async (req, res) => {
    try {
        const book = await Book.create(req.body);
        res.status(201).json({ message: "Book added", book });
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};

exports.rentBook = async (req, res) => {
    try {
        const { userId, bookId } = req.body;
        const user = await User.findById(userId);
        const book = await Book.findById(bookId);
        if (!user || !book) return res.status(404).json({ error: "User or Book not found" });

        // Prevent duplicates
        if (!user.rentedBooks.includes(bookId)) user.rentedBooks.push(bookId);
        if (!book.rentedBy.includes(userId)) book.rentedBy.push(userId);

        await user.save();
        await book.save();

        res.json({ message: "Book rented successfully" });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.returnBook = async (req, res) => {
    try {
        const { userId, bookId } = req.body;
        const user = await User.findById(userId);
        const book = await Book.findById(bookId);
        if (!user || !book) return res.status(404).json({ error: "User or Book not found" });

        user.rentedBooks = user.rentedBooks.filter(id => id.toString() !== bookId);
        book.rentedBy = book.rentedBy.filter(id => id.toString() !== userId);

        await user.save();
        await book.save();

        res.json({ message: "Book returned successfully" });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.getBookRenters = async (req, res) => {
    try {
        const book = await Book.findById(req.params.bookId).populate("rentedBy", "name email");
        if (!book) return res.status(404).json({ error: "Book not found" });
        res.json(book);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.updateBook = async (req, res) => {
    try {
        const updated = await Book.findByIdAndUpdate(req.params.bookId, req.body, { new: true });
        res.json({ message: "Book updated", updated });
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};

exports.deleteBook = async (req, res) => {
    try {
        const book = await Book.findById(req.params.bookId);
        if (!book) return res.status(404).json({ error: "Book not found" });

        await User.updateMany(
            { rentedBooks: book._id },
            { $pull: { rentedBooks: book._id } }
        );

        await book.deleteOne();
        res.json({ message: "Book deleted successfully" });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};
