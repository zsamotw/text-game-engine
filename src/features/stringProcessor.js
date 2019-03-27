const R = require('ramda')
const {
  isLookPattern,
  isLookAtPattern,
  isGoPattern
} = require('./patterns.js')
const {
  getLookCommand,
  getLookAtCommand,
  getGoCommand,
  getUndefinedCommand
} = require('./commands.js')

const stringMatcher =
  R.cond([
    [isLookPattern, R.always(getLookCommand())],
    [isLookAtPattern, str => getLookAtCommand(str)],
    [isGoPattern, str => getGoCommand(str)],
    [R.T, str => getUndefinedCommand(str)]
  ])

module.exports = {
  stringMatcher
}

/// //////////////
// test in node =>
/// /////////////
const res = stringMatcher('look at foo')
console.log(res)
