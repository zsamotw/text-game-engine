const R = require('ramda')
const P = require('./patterns.js')
const C = require('./commands.js')

const stringMatcher =
  R.cond([
    [P.isLookPattern, R.always(C.getLookCommand())],
    [P.isLookAtPattern, str => C.getLookAtCommand(str)],
    [P.isGoPattern, str => C.getGoCommand(str)],
    [P.isTakePattern, str => C.getTakeCommand(str)],
    [P.isPutPattern, str => C.getPutCommand(str)],
    [P.isPocketPattern, str => C.getPocketCommand(str)],
    [R.T, str => C.getUndefinedCommand(str)]
  ])

module.exports = {
  stringMatcher: stringMatcher
}
