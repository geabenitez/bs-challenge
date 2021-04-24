const { Schema, model } = require('mongoose')

const companySchma = Schema({
  name: String,
  cars: [{
    UUID: String,
    VIN: String,
    Make: String,
    Model: String,
    Mileage: Number,
    Year: Number,
    Price: Number,
    Zip_Code: String,
    Create_Date: Date,
    Update_Date: Date,
  }]
});

module.exports = model('Car', companySchma);