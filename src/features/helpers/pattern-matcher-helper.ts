import * as R from 'ramda'
import * as P from '../utils/patterns'

const isLookPattern = (str: string) => R.test(P.lookPattern, str)
const isLookAtPattern = (str: string) => R.test(P.lookAtPattern, str)
const isGoPattern = (str: string) => R.test(P.goPattern, str)
const isTakePattern = (str: string) => R.test(P.takePattern, str)
const isPutPattern = (str: string) => R.test(P.putPattern, str)
const isPocketPattern = (str: string) => R.test(P.pocketPattern, str)
const isTalkPattern = (str: string) => R.test(P.talkPattern, str)

export {
  isLookAtPattern,
  isLookPattern,
  isGoPattern,
  isTakePattern,
  isPutPattern,
  isPocketPattern,
  isTalkPattern
}
