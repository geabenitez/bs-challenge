const { fields } = require('./config')

module.exports = {
  validateUpload(provider_name, wrongtype, records) {
    // Validates required field for name
    if (!provider_name) throw new Error(`provider_name field not received but required`)

    // Validates at least 1 row is received
    if (records.length == 0) throw new Error(`File with no data has been received`)

    // Validates required columns
    const keys = Object.keys(records[0])
    if (!fields.map(f => keys.includes(f)).every(e => e) && keys.length < fields.length) {
      throw new Error(`File does not meet the minimun fields required.`)
    }
  }
}