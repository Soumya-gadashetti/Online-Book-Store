const db = require("../models");
const Book = db.book;

// Create and Save a new Tutorial

exports.create = (req, res) => {
    // Validate request
    if (!req.body.bookTitle) {
        res.status(400).send({ message: "Book Title can not be empty!" });
        return;
    }

    // Create a Book
    const book = new Book({
        category: req.body.category,
        bookTitle: req.body.bookTitle,
        price: req.body.price,
        author: req.body.author,
        publisher: req.body.publisher,
        description: req.body.description

    });

    // Save Tutorial in the database
    book
        .save(book)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while creating the Book."
            });
        });
};


// Retrieve all Tutorials from the database.
exports.findAll = (req, res) => {
    const bookTitle = req.query.bookTitle;
    var condition = bookTitle ? { bookTitle: { $regex: new RegExp(bookTitle), $options: "i" } } : {};

    Book.find(condition)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while retrieving Books."
            });
        });
};

// Find a single Tutorial with an id
exports.findOne = (req, res) => {

};

// Update a Tutorial by the id in the request
exports.update = (req, res) => {

};

// Delete a Tutorial with the specified id in the request
exports.delete = (req, res) => {

};

// Delete all Tutorials from the database.
exports.deleteAll = (req, res) => {

};

// Find all published Tutorials
exports.findAllPublished = (req, res) => {

};