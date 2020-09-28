const db = require("../models");
const User = db.user;

exports.findAll = (req, res) => {
    // const username = req.query.username;
    // var condition = username ? { username: { $regex: new RegExp(username), $options: "i" } } : {};
    var condition = { roles: "5f6c0a99de98010d9457ad24" }
    User.find(condition)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while retrieving tutorials."
            });
        });
};


exports.allAccess = (req, res) => {
    res.status(200).send("Public Content.");
};

exports.userBoard = (req, res) => {
    res.status(200).send("User Content.");
};

exports.adminBoard = (req, res) => {
    res.status(200).send("Admin Content.");
};

exports.moderatorBoard = (req, res) => {
    res.status(200).send("Moderator Content.");
};