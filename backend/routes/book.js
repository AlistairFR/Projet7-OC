const express = require("express");
const auth = require("../middleware/auth");
const multer = require("../middleware/multer-config");
const router = express.Router();


const bookController = require("../controllers/book");

router.get("/", bookController.getBooks);
router.get("/bestrating", bookController.getBestBooks);
router.get("/:id", bookController.getOneBook);
router.get("/:id/rating", auth, bookController.rateBook);
router.post("/", auth, multer, bookController.createBook);
router.put("/:id", auth, multer, bookController.updateBook);
router.delete("/:id", auth, bookController.deleteBook);

module.exports = router;