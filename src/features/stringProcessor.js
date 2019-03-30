const R = require('ramda')
const P = require('./patterns.js')
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
    [P.isLookPattern, R.always(getLookCommand())],
    [P.isLookAtPattern, str => getLookAtCommand(str)],
    [P.isGoPattern, str => getGoCommand(str)],
    [P.isTakePattern, str => getTakeCommand(str)],
    [P.isPutPattern, str => getPutCommand(str)],
    [P.isPocketPattern, str => getPocketCommand(str)],
    [R.T, str => getUndefinedCommand(str)]
  ])

module.exports = {
  stringMatcher
}
