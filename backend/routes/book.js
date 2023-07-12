const express = require("express");
const router = express.Router();

const bookController = require("../controllers/book");

// POST d'un nouveau livre
router.post('/', bookController.createBook);

// GET de la liste des livres
router.get("/", bookController.getBooks);

// GET d'un livre spécifique
router.get("/:id", bookController.getOneBook);

// PUT d'un livre modifié
router.put("/:id", bookController.updateBook);

//DELETE d'un livre
router.delete("/:id", bookController.deleteBook);

module.exports = router;