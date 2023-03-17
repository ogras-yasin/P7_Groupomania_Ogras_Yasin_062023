// Multer is a middleware used for handling multipart/form-data which is primarily used for uploading files.

const multer = require("multer"); // Importation du package 'multer'

// TYPES DE FICHIERS ACCEPTES
const MIME_TYPES = {
  "image/jpg": "jpg",
  "image/jpeg": "jpg",
  "image/png": "png",
}; // Création d'un dictionnaire 'MIME_TYPES'

// CONFIGURATION
const storage = multer.diskStorage({
  // Premier objet de configuration : indiquer à 'multer' dans quel dossier il doit enregistrer les fichiers
  destination: function (req, file, callback) {
    // En argument 1 : 'null' pour dire qu'il n'y a pas eut d'erreur
    // En argument 2 : le dossier de destination
    callback(null, "images");
  },

  // Deuxième objet de configuration : expliquer à 'multer' quel nom de fichier à utiliser
  filename: function (req, file, callback) {
    // Génération du nom du fichier
    console.log("multer");
    const name = file.originalname.split(" ").join("_");
    // Application de l'extension du fichier en utilisant des MIME_TYPES
    const extension = MIME_TYPES[file.mimetype];
    // En argument 1 : 'null' pour dire qu'il n'y a pas eut d'erreur
    // En argument 2 : le nom de fichier entier
    //date.now() renvoie le nombre de millisecondes depuis 1970
    // /ici on n'utilise pour donner un id unique, d'ou" "name+Date.now()"
    callback(null, name + Date.now() + "." + extension);
  },
}); // Création d'un objet de configuration pour 'multer'

// Exportation du middleware multer
module.exports = multer({
  storage: storage,
  limits: { fileSize: 1024 * 1024 * 10 } /* 10MB limit  */,
}).single("image");
