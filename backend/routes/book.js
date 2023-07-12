const express = require("express");
const auth = require("auth");
const router = express.Router();


const bookController = require("../controllers/book");

// POST d'un nouveau livre
router.post('/', auth, bookController.createBook);

// GET de la liste des livres
router.get("/", auth, bookController.getBooks);

// GET d'un livre spécifique
router.get("/:id", auth, bookController.getOneBook);

// PUT d'un livre modifié
router.put("/:id", auth, bookController.updateBook);

//DELETE d'un livre
router.delete("/:id", auth, bookController.deleteBook);

module.exports = router;