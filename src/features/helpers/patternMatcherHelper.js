const R = require('ramda')
const P = require('../utils/patterns')

const isLookPattern = (str) => R.test(P.lookPattern, str)
const isLookAtPattern = (str) => R.test(P.lookAtPattern, str)
const isGoPattern = (str) => R.test(P.goPattern, str)
const isTakePattern = (str) => R.test(P.takePattern, str)
const isPutPattern = (str) => R.test(P.putPattern, str)
const isPocketPattern = (str) => R.test(P.pocketPattern, str)

module.exports = {
  isLookAtPattern,
  isLookPattern,
  isGoPattern,
  isTakePattern,
  isPutPattern,
  isPocketPattern
}
