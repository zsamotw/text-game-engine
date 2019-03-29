const R = require('ramda')
const {
  isLookPattern,
  isLookAtPattern,
  isGoPattern,
  isTakePattern,
  isPutPattern,
  isPocketPattern
} = require('./patterns.js')
const {
  getLookCommand,
  getLookAtCommand,
  getTakeCommand,
  getGoCommand,
  getPutCommand,
  getPocketCommand,
  getUndefinedCommand
} = require('./commands.js')

const stringMatcher =
  R.cond([
    [isLookPattern, R.always(getLookCommand())],
    [isLookAtPattern, str => getLookAtCommand(str)],
    [isGoPattern, str => getGoCommand(str)],
    [isTakePattern, str => getTakeCommand(str)],
    [isPutPattern, str => getPutCommand(str)],
    [isPocketPattern, str => getPocketCommand(str)],
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
