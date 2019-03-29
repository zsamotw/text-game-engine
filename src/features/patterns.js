const R = require('ramda')

const lookPattern = /^look$/
const lookAtPattern = /^look at/
const goPattern = /^go/
const takePattern = /^take/
const putPattern = /^put/
const pocketPattern = /^pocket$/

exports.isLookPattern = (str) => R.test(lookPattern, str)
exports.isLookAtPattern = (str) => R.test(lookAtPattern, str)
exports.isGoPattern = (str) => R.test(goPattern, str)
exports.isTakePattern = (str) => R.test(takePattern, str)
exports.isPutPattern = (str) => R.test(putPattern, str)
exports.isPocketPattern = (str) => R.test(pocketPattern, str)

exports.lookAtPattern = lookAtPattern
exports.goPattern = goPattern
exports.takePattern = takePattern
exports.putPattern = putPattern
