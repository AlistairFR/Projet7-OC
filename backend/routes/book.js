const express = require("express");
const router = express.Router();

const auth = require("../middleware/auth");
const multer = require("../middleware/multer-config");
const sharp = require("sharp");

const bookController = require("../controllers/book");

router.get("/", bookController.getBooks);
router.get("/bestrating", bookController.getBestBooks);
router.get("/:id", bookController.getOneBook);
router.post("/:id/rating", auth, bookController.rateBook);
router.post("/", auth, multer, sharp, bookController.createBook);
router.put("/:id", auth, multer, sharp, bookController.updateBook);
router.delete("/:id", auth, bookController.deleteBook);

module.exports = router;