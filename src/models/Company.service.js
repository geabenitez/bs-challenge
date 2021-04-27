

const mongoose = require('mongoose')

const Company = require('./Company.model')

module.exports = {
  async insert(provider_name, records) {
    await Company.insertMany({
      _id: new mongoose.Types.ObjectId(),
      name: provider_name,
      cars: records
    })
  }
}