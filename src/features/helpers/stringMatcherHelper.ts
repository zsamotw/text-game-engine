import * as R from 'ramda'
import * as C from '../utils/commands'
import * as PMH from '../helpers/patternMatcherHelper'

const stringMatcher = R.cond([
  [PMH.isLookPattern, R.always(C.getLookCommand())],
  [PMH.isLookAtPattern, str => C.getLookAtCommand(str)],
  [PMH.isGoPattern, str => C.getGoCommand(str)],
  [PMH.isTakePattern, str => C.getTakeCommand(str)],
  [PMH.isPutPattern, str => C.getPutCommand(str)],
  [PMH.isPocketPattern, str => C.getPocketCommand(str)],
  [R.T, str => C.getUndefinedCommand(str)]
])

export { stringMatcher }
