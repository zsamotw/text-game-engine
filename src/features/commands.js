const { lookAtPattern, goPattern, takePattern, putPattern } = require('./patterns.js')

exports.getLookCommand = function () {
  return { order: 'Look', rest: '' }
}

exports.getLookAtCommand = function (str) {
  const rest = str.split(lookAtPattern)[1].trim()
  return { order: 'LookAt', rest: rest }
}

exports.getGoCommand = function (str) {
  const rest = str.split(goPattern)[1].trim()
  return { order: 'Go', rest: rest }
}

exports.getTakeCommand = function (str) {
  const rest = str.split(takePattern)[1].trim()
  return { order: 'Take', rest: rest }
}

exports.getPutCommand = function (str) {
  const rest = str.split(putPattern)[1].trim()
  return { order: 'Put', rest: rest }
}

exports.getPocketCommand = function (str) {
  return { order: 'Pocket', rest: '' }
}

exports.getUndefinedCommand = function (str) {
  return { order: 'Undefined', rest: '' }
}
