const multer = require("multer");

// TYPES DE FICHIERS ACCEPTES
const MIME_TYPES = {
  "image/jpg": "jpg",
  "image/jpeg": "jpg",
  "image/png": "png",
}; // Création d'un dictionnaire 'MIME_TYPES'

// CONFIGURATION
const storage = multer.diskStorage({
  destination: function (req, file, callback) {
    callback(null, "images");
  },

  filename: function (req, file, callback) {
    const name = file.originalname.split(" ").join("_");
    // Application de l'extension du fichier en utilisant des MIME_TYPES
    const extension = MIME_TYPES[file.mimetype];
    callback(null, name + Date.now() + "." + extension);
  },
});

// Exportation du middleware multer
module.exports = multer({
  storage: storage,
  limits: { fileSize: 1024 * 1024 * 10 } /* 10MB limit  */,
}).single("image");
