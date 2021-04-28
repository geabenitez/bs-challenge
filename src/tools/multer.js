const multer = require('multer')

// Define Multer configurations
const upload = multer({
  storage: multer.diskStorage({
    destination: function (req, file, cb) { cb(null, 'src/uploads') },
    filename: function (req, file, cb) { cb(null, 'filename') }
  }),
  fileFilter: (req, file, cb) => {
    if (file.mimetype !== 'text/csv') {
      req.wrongtype = true;
      return cb(null, false);
    }
    cb(null, true);
  },
})

module.exports = {
  uploadSingle(name) {
    return upload.single(name)
  }
}