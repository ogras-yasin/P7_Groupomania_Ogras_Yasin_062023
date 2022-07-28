// // Bunu sil
// // upload profil picture
// const UserModel = require("../models/users.model");
// const fs = require("fs");
// const { promisify } = require("util");
// const pipeline = promisify(require("stream").pipeline);
// // const uploadErrors = require("../utils/errors.utils");

// module.exports.uploadProfil = async (req, res) => {
//   try {
//     if (
//       req.file.detectedMimeType !== "image/jgp" &&
//       req.file.detectedMimeType !== "image/png" &&
//       req.file.detectedMimeType !== "image/jpeg"
//     ) {
//       throw Error("invalid file");
//     }

//     if (req.file.size > 5000000) throw Error("max size");
//   } catch (error) {
//     const errors = uploadErrors(err);
//     return res.status(201).json({ errors });
//   }

//   const fileName = req.body.name + ".jpg";
//   console.log(req);

//   await pipeline(
//     req.file.stream,
//     fs.createWriteStream(
//       `${_dirname}/../client/public/uploads/profil/${fileName}`
//     )
//   );

//   //   try {
//   //     await UserModel.findByIdAndUpdate(
//   //       req.body.userId,
//   //       { $set: { picture: "./uploads/profil/" + fileName } },
//   //       { new: true, upsert: true, setDefaultsOnInsert: true },
//   //       (err, docs) => {
//   //         if (!err) return res.send(docs);
//   //         else return res.status(500).send({ message: err });
//   //       }
//   //     );
//   //   } catch (err) {
//   //     res.status(400).send({ message: err });
//   //   }
// };
