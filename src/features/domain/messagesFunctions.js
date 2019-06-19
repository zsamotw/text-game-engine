const R = require('ramda')
const L = require('../utils/lenses')

const getSystemMessages = state => R.view(L.systemMessages, state)

module.exports = {
  getSystemMessages
}
