const express = require('express');
const multer = require('multer')
const parse = require('csv-parse/lib/sync')
const fs = require('fs')
const mongoose = require('mongoose')

const { fields, storage } = require('./tools')
const { MongoMemoryServer } = require('mongodb-memory-server');

const upload = multer({ storage: storage(multer) })
const port = 9999
const app = express()

const mongoServer = new MongoMemoryServer();
// Connection to DB
mongoServer.getUri().then(uri => {
  mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true }, (err) => {
    if (err) throw new Error(err)
  });
})

app.post('/', upload.single('provider_file'), async ({ file, body }, res) => {

  // Reads the received file
  const data = fs.readFileSync(file.path, 'utf8')

  // Parses the file contents to json
  const records = parse(data, { columns: true, skip_empty_lines: true })

  // VALIDATIONS
  // Validates required field for name
  if (!body.provider_name) {
    return res.status(406).json({
      message: `provider_name field not received but required`,
      success: false
    })
  }

  // Validates at least 1 row is received
  if (records.length == 0) {
    return res.status(406).json({
      message: `File with no data has been received`,
      success: false
    })
  }

  // Validates required columns
  const keys = Object.keys(records[0])
  if (!fields.map(f => keys.includes(f)).every(e => e) && keys.length < fields.length) {
    return res.status(406).json({
      message: `File does not meet the minimun fields required.`,
      success: false
    })
  }

  // Stores the information
  const Company = require('./models/Company.model')
  try {
    await Company.insertMany({
      _id: new mongoose.Types.ObjectId(),
      name: body.provider_name,
      cars: records
    })
  } catch (error) {
    return res.status(500).json({ message: 'Ha error while processing the file has occured', success: false });
  }

  return res.status(201).json({ message: 'The file has been processed successfully', success: true });
});

module.exports = app