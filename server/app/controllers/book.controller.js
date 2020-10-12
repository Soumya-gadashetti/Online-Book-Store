const db = require("../models");
const Book = db.books;

// Create and Save a new Tutorial

exports.create = (req, res) => {
    console.log(req.file);
    // Validate request
    if (!req.body.title) {
        res.status(400).send({ message: "Book Title can not be empty!" });
        return;
    }

    // Create a Book
    const book = new Book({
        title: req.body.title,
        category: req.body.category,
        price: req.body.price,
        quantity: req.body.quantity,
        author: req.body.author,
        publisher: req.body.publisher,
        description: req.body.description,
        productImage: req.file.path

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


// Retrieve all Books from the database.
exports.findAll = (req, res) => {
    const title = req.query.title;
    var condition = title ? { title: { $regex: new RegExp(title), $options: "i" } } : {};

    Book.find(condition)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while retrieving Book."
            });
        });
};

// Find a single Book with an id
exports.findOne = (req, res) => {
    const id = req.params.id;
    console.log(id);
    Book.findById(id)
        .then(data => {
            if (!data)
                res.status(404).send({ message: "Not found Book with id " + id });
            else res.send(data);
        })
        .catch(err => {
            res
                .status(500)
                .send({ message: "Error retrieving Book with id=" + id });
        });
};

// Find all the books based on category
exports.findCategory = (req, res) => {
    const category = req.query.category;
    console.log(category);
    // var condition = category ? { category: { $regex: new RegExp(category), $options: "si" } } : {};
    var condition = { category: { $regex: `^${category}.*`, $options: 'si' } }
    // Book.find({ category: category })
    Book.find(condition)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while retrieving Books by category."
            });
        });
};

exports.findAuthor = (req, res) => {
    const author = req.query.author;
    // console.log(category);
    var condition = { author: { $regex: `^${author}.*`, $options: 'si' } }
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

exports.findSearch = (req, res) => {
    // const author = req.query.author;
    // // console.log(category);
    // var condition = { author: { $regex: `^${author}.*`, $options: 'si' } }
    Book.find({ title: { $regex: `^${req.params.title}.*`, $options: 'si' } })
        .then(data => {
            // if (data.length > 0)
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while retrieving Books."
            });
        });
};


// // Update a Book by the id in the request
exports.update = (req, res) => {
    if (!req.body) {
        return res.status(400).send({
            message: "Data to update can not be empty!"
        });
    }

    const id = req.params.id;

    Book.findByIdAndUpdate(id, req.body, { useFindAndModify: false })
        .then(data => {
            if (!data) {
                res.status(404).send({
                    message: `Cannot update Book with id=${id}. Maybe Book was not found!`
                });
            } else res.send({ message: "Book was updated successfully." });
        })
        .catch(err => {
            res.status(500).send({
                message: "Error updating Book with id=" + id
            });
        });
};

// // Delete a Book with the specified id in the request
exports.delete = (req, res) => {
    const id = req.params.id;

    Book.findByIdAndRemove(id, { useFindAndModify: false })
        .then(data => {
            if (!data) {
                res.status(404).send({
                    message: `Cannot delete Book with id=${id}.`
                });
            } else {
                res.send({
                    message: "Book was deleted successfully!"
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Could not delete Book with id=" + id
            });
        });
};

// // Delete all Tutorials from the database.
// exports.deleteAll = (req, res) => {

// };


// };