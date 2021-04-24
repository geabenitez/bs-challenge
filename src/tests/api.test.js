const request = require('supertest')
const app = require('../server')
const mongoose = require('mongoose')
const Company = require('../models/Company.model')

afterAll(async done => {
  await mongoose.disconnect()
  done()
})
describe('POST /', () => {
  it('Validates required field for name', async done => {
    const res = await request(app)
      .post('/')
      .attach('provider_file', 'src/tests/emptydata.csv')
      .expect(406)
    expect(res.body.message).toBe("provider_name field not received but required")
    done()
  })

  it('Validates at least 1 row is received', async done => {
    const res = await request(app)
      .post('/')
      .field('provider_name', 'company')
      .attach('provider_file', 'src/tests/emptydata.csv')
      .expect(406)
    expect(res.body.message).toBe("File with no data has been received")
    done()
  })

  it('Validates required columns', async done => {
    const res = await request(app)
      .post('/')
      .field('provider_name', 'company')
      .attach('provider_file', 'src/tests/missingfields.csv')
      .expect(406)
    expect(res.body.message).toBe("File does not meet the minimun fields required.")
    done()
  })

  it('Stores the information correctly', async done => {
    const res = await request(app)
      .post('/')
      .field('provider_name', 'company')
      .attach('provider_file', 'src/tests/testdata.csv')
      .expect(201)
    expect(res.body.message).toBe("The file has been processed successfully")

    const data = await Company.find({})
    expect(data[0].name).toBe('company')
    expect(data[0].cars).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          UUID: '6fb12524-06a7-4409-92ba-6aa9cd312cb5',
          VIN: 'FAidTRdu',
          Make: 'Jamaica',
          Model: 'The Valley',
          Mileage: 8335,
          Year: 2018,
          Price: 38412.55,
          Zip_Code: '64486',
        })
      ])
    )
    done()
  })
})