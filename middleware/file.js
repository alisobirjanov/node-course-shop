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
    cb(null, Date.now() + path.extname(file.originalname));
  },
});

const uploads = multer({
  storage,
  limits: { fieldSize: 2 * 1024 * 1024 },
  fileFilter: (req, file, cb) => {
    const extname = path.extname(file.originalname);
    if (extname !== ".jpg" && extname !== ".png" && extname !== ".jpeg") {
      const err = new Error("xatolik bor");
      err.code = 404;
      return cb(err);
    }
    cb(null, true);
  },
  preserverPath: true,
});

module.exports = uploads;