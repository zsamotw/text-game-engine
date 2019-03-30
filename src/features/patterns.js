const R = require('ramda')

const lookPattern = /^look$/
const lookAtPattern = /^look at/
const goPattern = /^go/
const takePattern = /^take/
const putPattern = /^put/
const pocketPattern = /^pocket$/

const isLookPattern = (str) => R.test(lookPattern, str)
const isLookAtPattern = (str) => R.test(lookAtPattern, str)
const isGoPattern = (str) => R.test(goPattern, str)
const isTakePattern = (str) => R.test(takePattern, str)
const isPutPattern = (str) => R.test(putPattern, str)
const isPocketPattern = (str) => R.test(pocketPattern, str)

module.exports = {
  isLookAtPattern: isLookAtPattern,
  isLookPattern: isLookPattern,
  isGoPattern: isGoPattern,
  isTakePattern: isTakePattern,
  isPutPattern: isPutPattern,
  isPocketPattern: isPocketPattern,
  lookAtPattern: lookAtPattern,
  goPattern: goPattern,
  takePattern: takePattern,
  putPattern: putPattern

}
