const express = require("express");
const mongoose = require("mongoose");
const path = require("path");
const helmet = require("helmet");
require("dotenv").config();
const cors = require("cors");
// Routes files
const userRoutes = require("./routes/user.routes");
const PostRoutes = require("./routes/post.routes");
const ficheUserRoutes = require("./routes/ficheUser.routes.js");
mongoose
  .connect(process.env.DB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("Connexion à MongoDB réussie !"))
  .catch(() => console.log("Connexion à MongoDB échouée !"));

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(helmet());
app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin" }));
app.use(cors());

app.use(
  helmet({
    // empecher le cross origin error 

    crossOriginResourcePolicy: false,
  })
);

const morgan = require("morgan");
app.use(morgan("dev"));

app.use("/images", express.static(path.join(__dirname, "images")));

// Routes

app.use("/api/auth", userRoutes);
app.use("/api/post", PostRoutes);
app.use("/api/ficheUser", ficheUserRoutes);
app.use((req, res) => {
  res.json({ message: "Votre requête a bien été reçue !" });
});

module.exports = app;
