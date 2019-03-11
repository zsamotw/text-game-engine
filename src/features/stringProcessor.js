// import * as R from 'ramda'
// exports = module.export = {}

const R = require('ramda')
const { isLookPattern, isLookAtPattern} = require('./patterns.js')
const { getLookCommand, getLookAtCommand, getUndefindedCommand  } = require('./commands.js')

// const lookPattern = /^look$/
// const lookAtPattern = /^look at/


// const isLookPattern = function (str) {
//   return lookPattern.test(str)
// }

// const isLookAtPattern = function (str) {
//   return lookAtPattern.test(str)
// }


// const getLookCommand = function () {
//   return { command: 'look', rest: '' }
// }

// const getLookAtCommand = function (str) {
//   const rest = str.split(lookAtPattern)[1]
//   return { command: 'LookAt', rest: rest }
// }

// const getUndefindedCommand = function(str) {
//   return { command: 'Undefined', rest: '' }
// }


const stringMatcher =
  R.cond([
    [isLookPattern, R.always(getLookCommand())],
    [isLookAtPattern, str => getLookAtCommand(str)],
    [R.T, str => getUndefindedCommand(str)]
  ])

//test in node =>
const res = stringMatcher('look at')
console.log(res)

