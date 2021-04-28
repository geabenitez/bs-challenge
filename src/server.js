const parse = require('csv-parse/lib/sync')
const fs = require('fs')
const { uploadSingle } = require('./tools/multer')

// Define Application
const express = require('express');
const app = express()

require('./tools/mongoose')() // Connection to DB

const { validateUpload } = require('./tools/validations') // Import validations

const Car = require('./models/Company.service') // Import methods

app.post('/', uploadSingle('provider_file'), async ({ file, body, wrongtype }, res) => {
  // Validate type of file received. 
  if (wrongtype) {
    return res.status(406).json({ message: `Wrong file type received. Only CSV is allowed`, success: false })
  }

  const data = fs.readFileSync(file.path, 'utf8') // Reads the received file
  const records = parse(data, { columns: true, skip_empty_lines: true }) // Parses the file contents to json

  // VALIDATIONS
  try {
    validateUpload(body.provider_name, wrongtype, records)
  } catch (error) {
    return res.status(406).json({ message: error.message, success: false })
  }

  // Stores the information
  try {
    Car.insert(body.provider_name, records)
  } catch (error) {
    return res.status(500).json({ message: 'Ha error while processing the file has occured', success: false });
  }

  return res.status(201).json({ message: 'The file has been processed successfully', success: true });
});

module.exports = app