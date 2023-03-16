const express = require("express");
const mongoose = require("mongoose");
const path = require("path");
const helmet = require("helmet");
require("dotenv").config();
// Routes files
const userRoutes = require("./routes/user.routes");
const PostRoutes = require("./routes/post.routes");

mongoose
  .connect(process.env.DB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("Connexion à MongoDB réussie !"))
  .catch(() => console.log("Connexion à MongoDB échouée !"));

const app = express();

// Cors (need to create a config file for better lisibility)
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content, Accept, Content-Type, Authorization"
  );
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PUT, DELETE, PATCH, OPTIONS"
  );
  next();
});

app.use(
  helmet({
    // empecher le cross origin error
    crossOriginResourcePolicy: false,
  })
);
// Permet de parser et de mettre dans le body toutes les requetes
app.use(express.json());

// importation de morgan (looger http) //j'ai pas utiiliser encore
const morgan = require("morgan");
//logger les request et les response
app.use(morgan("dev"));

// app.use((req, res, next) => {
//   console.log("Premiere requete 1");
//   next();
// });

app.use("/images", express.static(path.join(__dirname, "images")));

// Routes

app.use("/api/auth", userRoutes);
app.use("/api/post", PostRoutes);

app.use((req, res) => {
  res.json({ message: "Votre requête a bien été reçue !" });
});

module.exports = app;

/*
  The app.use() function adds a new middleware to the app. Essentially, whenever a request hits your backend, 
  Express will execute the functions you passed to app.use() in order. 
  express.json() is a built in middleware function in Express starting from v4.16.0. It parses incoming JSON requests and puts the parsed data in req.body.
   */
