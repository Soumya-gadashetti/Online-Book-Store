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