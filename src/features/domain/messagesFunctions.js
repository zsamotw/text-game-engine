const R = require('ramda')

const getSystemMessages = state => R.prop('systemMessages', state)

module.exports = {
  getSystemMessages
}
