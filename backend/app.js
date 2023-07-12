const express = require("express");
const mongoose = require("mongoose");

const bookRoutes = require("./routes/book");
const userRoutes = require("./routes/user");

mongoose.connect('mongodb+srv://oc_projet7_admin:adminp7oc@cluster0.xnqr89c.mongodb.net/?retryWrites=true&w=majority',
  { useNewUrlParser: true,
    useUnifiedTopology: true })
  .then(() => console.log('Connexion à MongoDB réussie !'))
  .catch(() => console.log('Connexion à MongoDB échouée !'));

const app = express();

app.use(express.json());

//Permet les requêtes cross-origin depuis n'importe quel domaine
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next();
});

app.use('/api/books', bookRoutes);
app.use("/api/auth", userRoutes);

module.exports = app;