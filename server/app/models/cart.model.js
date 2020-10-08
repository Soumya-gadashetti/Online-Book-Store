var mongoose = require('mongoose');
var schema = mongoose.Schema(
    {
        book: Object,
        quantity: Number,
        username: String,
        totoalPrice: Number
    }

);

module.exports = mongoose.model("cart", schema);