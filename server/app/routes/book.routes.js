module.exports = app => {
    const books = require("../controllers/book.controller.js");

    var router = require("express").Router();
    const multer = require('multer');
    const upload = multer({ dest: 'uploads/' });
    // Create a new Book
    router.post("/", upload.single('productImage'), books.create);

    // Retrieve all Books
    router.get("/g", books.findAll);

    //   // Retrieve all published Tutorials
    //   router.get("/published", books.findAllPublished);
    router.get("/category", books.findCategory);
    //   // Retrieve a single Book with id
    router.get("/:id", books.findOne);



    // Update a Book with id
    router.put("/:id", books.update);

    //   // Delete a Book with id
    router.delete("/:id", books.delete);

    //   // Create a new Tutorial
    //   router.delete("/", books.deleteAll);

    app.use('/api/books', router);
};