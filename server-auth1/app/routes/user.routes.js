const { authJwt } = require("../middlewares");
const controller = require("../controllers/user.controller");
const controller1 = require("../controllers/book.controller");
module.exports = function (app) {
    app.use(function (req, res, next) {
        res.header(
            "Access-Control-Allow-Headers",
            "x-access-token, Origin, Content-Type, Accept"
        );
        next();
    });

    app.get("/api/get/user", controller.findAll);

    app.get("/api/books/g", controller1.findAll);
    app.get("/api/books/:id", controller1.findOne);
    app.get("/api/books/category", controller1.findAll);
    app.get("/api/books/author", controller1.findAll);
    app.put("/api/books/update/:id", controller1.update);
    app.delete("/api/books/:id", controller1.delete);

    app.get("/api/test/all", controller.allAccess);

    app.get("/api/test/user", [authJwt.verifyToken], controller.userBoard);

    // app.get(
    //     "/api/test/mod",
    //     [authJwt.verifyToken, authJwt.isModerator],
    //     controller.moderatorBoard
    // );

    app.get(
        "/api/test/admin",
        [authJwt.verifyToken, authJwt.isAdmin],
        controller.adminBoard
    );

    app.post(
        "/api/books",
        [authJwt.verifyToken, authJwt.isAdmin],
        controller1.create
    );
};