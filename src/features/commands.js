const P = require('./patterns.js')

exports.getLookCommand = function () {
  return { order: 'Look', rest: '' }
}

exports.getLookAtCommand = function (str) {
  const rest = str.split(P.lookAtPattern)[1].trim()
  return { order: 'LookAt', rest: rest }
}

exports.getGoCommand = function (str) {
  const rest = str.split(P.goPattern)[1].trim()
  return { order: 'Go', rest: rest }
}

exports.getTakeCommand = function (str) {
  const rest = str.split(P.takePattern)[1].trim()
  return { order: 'Take', rest: rest }
}

exports.getPutCommand = function (str) {
  const rest = str.split(P.putPattern)[1].trim()
  return { order: 'Put', rest: rest }
}

exports.getPocketCommand = function (str) {
  return { order: 'Pocket', rest: '' }
}

exports.getUndefinedCommand = function (str) {
  return { order: 'Undefined', rest: '' }
}
