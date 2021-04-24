module.exports = {
  fields: [
    'UUID',
    'VIN',
    'Make',
    'Model',
    'Mileage',
    'Year',
    'Price',
    'Zip_Code',
    'Create_Date',
    'Update_Date',
  ],
  storage(multer) {
    return multer.diskStorage({
      destination: function (req, file, cb) {
        cb(null, 'src/uploads')
      },
      filename: function (req, file, cb) {
        cb(null, 'filename')
      }
    })
  },
}