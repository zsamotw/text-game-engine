const R = require('ramda')
const PMH = require('../helpers/patternMatcherHelper')
const C = require('../elements/commands.js')

const stringMatcher =
  R.cond([
    [PMH.isLookPattern, R.always(C.getLookCommand())],
    [PMH.isLookAtPattern, str => C.getLookAtCommand(str)],
    [PMH.isGoPattern, str => C.getGoCommand(str)],
    [PMH.isTakePattern, str => C.getTakeCommand(str)],
    [PMH.isPutPattern, str => C.getPutCommand(str)],
    [PMH.isPocketPattern, str => C.getPocketCommand(str)],
    [R.T, str => C.getUndefinedCommand(str)]
  ])

module.exports = {
  stringMatcher
}
