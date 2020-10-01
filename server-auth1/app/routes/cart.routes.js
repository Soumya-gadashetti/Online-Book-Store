var express = require('express');
var bodyParser = require('body-parser');

var db = require('../models');
var router = express.Router();
var cart = require("../models/cart.model");
router.use(bodyParser.json());
router.use(bodyParser.urlencoded({ extended: false }));

const books = db.books;

router.get('/getCartItems', (req, res) => {
    cart.find({ username: req.query.username }).then((userCartBooks) => {
        if (userCartBooks.length > 0) {
            res.send({ cartItems: userCartBooks, message: true });//array
        } else {
            res.send({ message: false });
        }
    }).catch((err) => res.send({ message: err.message }));

});


router.post('/addBook', (req, res) => {
    console.log(books());
    cart.find({ username: req.query.username })
        .then((userCartBooks) => {
            if (userCartBooks.length > 0) {
                let cartbook = userCartBooks
                    .find((userCartBook) => {
                        for (const key in userCartBook.book) {
                            if (userCartBook.book[key] == req.query.id) {
                                return userCartBook;
                            }
                        }
                    });
                if (cartbook) {
                    cart.findByIdAndUpdate(cartbook._id, { $inc: { quantity: +1 }, totalPrice: cartbook.book.price * (cartbook.quantity + 1) })
                        .then((result) => {
                            if (result) {
                                res.send({ message: true, cartItem: result });//object
                            } else {
                                res.send({ message: false });
                            }
                        }).catch(err => res.send({ message: err.message }));
                } else {
                    books.findById(req.query.id).then((book) => {
                        let newItem = cart({ book: book, quantity: 1, username: req.query.username, totalPrice: book.price });
                        newItem.save().then((item) => {
                            if (item) {
                                res.send({ message: true, cartItem: item });
                            } else {
                                res.send({ message: false });
                            }
                        }).catch(err => res.send({ message: err.message }));
                    }).catch(err => res.send(err.message));

                }
            } else {
                books.findById(req.query.id).then((book) => {
                    let newItem = cart({ book: book, quantity: 1, username: req.query.username, totalPrice: book.price });
                    newItem.save().then((item) => {
                        if (item) {
                            res.send({ message: true, cartItem: item });
                        } else {
                            res.send({ message: false });
                        }
                    }).catch(err => res.send({ message: err.message }));
                }).catch(err => res.send(err.message));
            }
        }).catch(err => res.send({ message: err.message }));
});



router.post('/deleteBook', (req, res) => {
    cart.find({ username: req.query.username }).then((userCartBooks) => {
        if (userCartBooks.length > 0) {
            let cartbook = userCartBooks.find((userCartBook) => {
                for (const key in userCartBook.book) {
                    if (userCartBook.book[key] == req.query.id) {
                        return userCartBook;
                    }
                }
            });
            if (cartbook) {
                cart.findByIdAndRemove(cartbook._id)
                    .then(() => {
                        res.send({ message: true });
                    }).catch((err) => res.send({ message: err }));
            } else {
                res.send({ message: false });
            }
        } else {
            res.send({ message: false });
        }
    })
        .catch((err) => res.send({ message: err }));

});

router.post('/inc', (req, res) => {
    cart.find({ username: req.query.username }).then((userCartBooks) => {
        if (userCartBooks.length > 0) {
            let cartbook = userCartBooks.find((userCartBook) => {
                for (const key in userCartBook.book) {
                    if (userCartBook.book[key] == req.query.id) {
                        return userCartBook;
                    }
                }
            });
            if (cartbook) {
                cart.findById(cartbook._id).then((cartBookById) => {
                    if (cartBookById) {
                        cartBookById.update({ $inc: { quantity: +1 }, totalPrice: cartbook.book.price * (cartbook.quantity + 1) }).then((cartBookUpdate) => {
                            if (cartBookUpdate) {
                                res.send({ message: true });
                            } else {
                                res.send({ message: false });
                            }
                        }).catch(err => res.send({ message: err.message }));
                        //res.send({message:true,cartItem:result});//object

                    } else {
                        res.send({ message: false });
                    }
                }).catch(err => res.send({ message: err.message }));
            } else {
                res.send({ message: false });
            }
        } else {
            res.send({ message: false });
        }
    }).catch(err => res.send({ message: err }));

});

router.post('/dec', (req, res) => {
    cart.find({ username: req.query.username }).then((userCartBooks) => {
        if (userCartBooks.length > 0) {
            let cartbook = userCartBooks.find((userCartBook) => {
                for (const key in userCartBook.book) {
                    if (userCartBook.book[key] == req.query.id) {
                        return userCartBook;
                    }
                }
            });
            if (cartbook) {
                cart.findById(cartbook._id).then((cartBookById) => {
                    if (cartBookById) {
                        cartBookById.update({ $inc: { quantity: -1 }, totalPrice: cartbook.book.price * (cartbook.quantity - 1) }).then((cartBookUpdate) => {
                            if (cartBookUpdate) {
                                res.send({ message: true });
                            } else {
                                res.send({ message: false });
                            }
                        }).catch(err => res.send({ message: err.message }));
                        //res.send({message:true,cartItem:result});//object
                    } else {
                        res.send({ message: false });
                    }
                }).catch(err => res.send({ message: err.message }));
            } else {
                res.send({ message: false });
            }
        } else {
            res.send({ message: false });
        }
    }).catch(err => res.send({ message: err.message }));

});
module.exports = router;


// module.exports = app => {
//     const books = require("../controllers/book.controller.js");
//     var router = require("express").Router();

// router.post('/getcart', (req, res) => { //generates the list of products in the cart
//   let books = [], id = null;
//   let cart = JSON.parse(req.body.cart);
//   if (!cart) return res.json(books)
//   for (var i = 0; i < data.books.length; i++) {
//     id = data.books[i].id.toString();
//     if (cart.hasOwnProperty(id)) {
//       data.books[i].qty = cart[id]
//       books.push(data.books[i]);
//     }
//   }
//   return res.json(books);
// });

// app.use('/api/cart', router);
// }