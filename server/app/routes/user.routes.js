const { authJwt } = require("../middlewares");
const controller = require("../controllers/user.controller");
const controller1 = require("../controllers/book.controller");
const multer = require('multer');

var storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './uploads/');
    },
    filename: function (req, file, cb) {
        cb(null, new Date().toISOString().replace(/:/g, "-") + "_" + file.originalname);
    }
});

const fileFilter = (req, file, cb) => {
    if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/jpg' || file.mimetype === 'image/png' || file.mimetype === 'image/jfif') {
        cb(null, true);
    } else {
        cb(null, false);
    }
};

const upload = multer({
    storage: storage,
    limits: { fileSize: 1024 * 1024 * 5 },
    fileFilter: fileFilter
});
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
    app.get("/api/books/category", controller1.findCategory);
    app.get("/api/books/author", controller1.findAuthor);
    app.get("/api/books/search/:title", controller1.findSearch);
    app.get("/api/books/:id", controller1.findOne);

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

    // app.post("/api/books", controller1.create);
    app.post("/api/books", upload.single('productImage'), controller1.create);
    // app.post(
    //     "/api/books",
    //     [authJwt.verifyToken, authJwt.isAdmin],
    //     controller1.create
    // );
};