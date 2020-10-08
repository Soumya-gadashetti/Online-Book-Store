const mongoose = require("mongoose");

const User = mongoose.model(
    "User",
    new mongoose.Schema({
        username: String,
        email: String,
        password: String,
        roles: [
            {
                type: mongoose.Schema.Types.ObjectId, //An ObjectId is a special type typically used for unique identifiers.
                //objectId is a class
                ref: "Role"
            }
        ]
    })
);

module.exports = User;