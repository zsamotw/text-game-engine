import * as R from 'ramda'
import * as CH from './command-helper'
import * as PMH from './pattern-matcher-helper'

const stringMatcher = R.cond([
  [PMH.isLookPattern, R.always(CH.getLookCommand())],
  [PMH.isLookAtPattern, str => CH.getLookAtCommand(str)],
  [PMH.isGoPattern, str => CH.getGoCommand(str)],
  [PMH.isTakePattern, str => CH.getTakeCommand(str)],
  [PMH.isPutPattern, str => CH.getPutCommand(str)],
  [PMH.isPocketPattern, str => CH.getPocketCommand(str)],
  [PMH.isTalkPattern, str => CH.getTalkCommand(str)],
  [R.T, str => CH.getUndefinedCommand(str)]
])

export { stringMatcher }
