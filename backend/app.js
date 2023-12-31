const express = require("express");
const mongoose = require("mongoose");
const path = require("path");

require('dotenv').config();

const bookRoutes = require("./routes/book");
const userRoutes = require("./routes/user");

const app = express();

// Gère la connexion à la base de données
mongoose.connect(`mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.xnqr89c.mongodb.net/?retryWrites=true&w=majority`,
  { useNewUrlParser: true,
    useUnifiedTopology: true })
  .then(() => console.log('Connexion à MongoDB réussie !'))
  .catch(() => console.log('Connexion à MongoDB échouée !'));

//Permet les requêtes cross-origin depuis n'importe quel domaine
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next();
});

app.use(express.json());
app.use("/api/auth", userRoutes);
app.use('/api/books', bookRoutes);
app.use('/images', express.static(path.join(__dirname, "images")));

module.exports = app;
