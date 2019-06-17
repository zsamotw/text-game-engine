const R = require('ramda')
const L = require('../elements/lenses')

const getSystemMessages = state => R.view(L.systemMessages, state)

module.exports = {
  getSystemMessages
}
