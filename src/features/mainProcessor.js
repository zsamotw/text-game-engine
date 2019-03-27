const { processCommand } = require('./commandProcessor.js')
const { stringMatcher } = require('./stringProcessor.js')

const process = function (input, gameState) {
  const command = stringMatcher(input)
  return processCommand(command, gameState)
}

module.exports = { process }

/// //////////////
// test in node =>
/// /////////////
const { state } = require('../db/state.js')
const res = process('look', state)
console.log(res)
