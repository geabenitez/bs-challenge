const multer = require('multer')

// Define Multer configurations
const upload = multer({
  storage: multer.diskStorage({
    destination: function (req, file, cb) { cb(null, 'src/uploads') },
    filename: function (req, file, cb) { cb(null, 'filename') }
  })
})

module.exports = {
  uploadSingle(name) {
    return upload.single(name)
  }
}