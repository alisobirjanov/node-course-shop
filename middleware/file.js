// const multer = require('multer')

// const storage = multer.diskStorage({
//     destination(req, file, cb) {
//         cb(null, images)
//     },
//     filename(req, file, cb) {
//         cb(null, new Date().toISOString() + '-' + file.originalname)
//     }
// })

// const allowTypes = ["images/png", "images/jpg", "images/jpeg"];


// const fileFilter = (req, file, cb) => {
//     if (allowTypes.includes(file.mimetype)) {
//       cb(null, true);
//     } else {
//       cb(null, false);
//     }
// }

// module.exports = multer({
//     storage, fileFilter
// })



const multer = require("multer");
const path = require("path");

// Setting multer
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads");
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + file.originalname);
  },
});


const allowTypes = ["image/png", "image/jpg", "image/jpeg"];

const uploads = multer({
  storage,
  limits: { fieldSize: 2 * 1024 * 1024 },
  fileFilter: (req, file, cb) => {
    if (allowTypes.includes(file.mimetype)) {
      cb(null, true);
    } else {
      cb(null, false);
    }
},
  preserverPath: true,
});

module.exports = uploads;