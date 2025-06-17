const Book = require("../models/book.model");
const Member = require("../models/member.model");

exports.addBook = async (req, res) => {
    try {
        const book = await Book.create(req.body);
        res.status(201).json(book);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};

exports.borrowBook = async (req, res) => {
    try {
        const { memberId, bookId } = req.body;
        const [book, member] = await Promise.all([
            Book.findById(bookId),
            Member.findById(memberId)
        ]);
        if (!book || !member) return res.status(404).json({ error: "Not found" });
        if (book.status !== "available") return res.status(400).json({ error: "Book not available" });

        book.borrowers.push(memberId);
        book.status = "borrowed";
        member.borrowedBooks.push(bookId);
        await Promise.all([book.save(), member.save()]);

        res.json({ message: "Book borrowed" });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.returnBook = async (req, res) => {
    try {
        const { memberId, bookId } = req.body;
        const book = await Book.findByIdAndUpdate(bookId, { $pull: { borrowers: memberId }, status: "available" }, { new: true });
        const member = await Member.findByIdAndUpdate(memberId, { $pull: { borrowedBooks: bookId } }, { new: true });
        if (!book || !member) return res.status(404).json({ error: "Not found" });

        res.json({ message: "Book returned", book, member });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.getBookBorrowers = async (req, res) => {
    try {
        const book = await Book.findById(req.params.bookId).populate("borrowers", "name email");
        res.json(book || { error: "Not found" });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.updateBook = async (req, res) => {
    try {
        const book = await Book.findByIdAndUpdate(req.params.bookId, req.body, { new: true });
        res.json(book || { error: "Not found" });
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};

exports.deleteBook = async (req, res) => {
    try {
        const book = await Book.findByIdAndDelete(req.params.bookId);
        if (!book) return res.status(404).json({ error: "Not found" });
        await Member.updateMany({}, { $pull: { borrowedBooks: book._id } });
        res.json({ message: "Book deleted" });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};
