const { lookAtPattern, goPattern } = require('./patterns.js')

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

exports.getUndefinedCommand = function (str) {
  return { order: 'Undefined', rest: '' }
}
