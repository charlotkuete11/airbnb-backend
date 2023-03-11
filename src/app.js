const express = require('express'); // importer notre framework express
const bodyParser = require('body-parser'); // importer notre package bodyParser
const mongoose = require('mongoose'); // importer notre package mongoose
const bcrypt = require('bcrypt'); // importer notre package bcrypt
const cors = require('cors'); // importer notre package cors
const errorHandler = require('./middlewares/errorHandler');
require('dotenv').config();

const app = express(); // pour demarrer le serveur
const apiRoute = require("./routes")

app.use(bodyParser.json());
app.use(cors())

mongoose.set("strictQuery", false)

mongoose.connect(`mongodb+srv://${process.env.MONGODB_USER}:${process.env.MONGODB_PASSWORD}@${process.env.MONGODB_CLUSTER}.mongodb.net/?retryWrites=true&w=majority`)
    .then(() => {
        console.log("Successfully logged in")
    })
    .catch((err) => {
        console.log(err)
    })

// Definissons nos routes
app.use("/api/v1", apiRoute);
app.use(errorHandler);

// JSON.stringify() AND JSON.parse()

// Definir le port d'ecoute du serveur
app.listen(process.env.PORT, () => {
    console.log("serveur lancer encore !")
})