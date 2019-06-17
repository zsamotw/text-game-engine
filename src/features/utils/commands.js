const P = require('./patterns')

const getLookCommand = function () {
  return {
    order: 'Look',
    rest: ''
  }
}

const getLookAtCommand = function (str) {
  const rest = str.split(P.lookAtPattern)[1].trim()
  return {
    order: 'LookAt',
    rest: rest
  }
}

const getGoCommand = function (str) {
  const rest = str.split(P.goPattern)[1].trim()
  return {
    order: 'Go',
    rest: rest
  }
}

const getTakeCommand = function (str) {
  const rest = str.split(P.takePattern)[1].trim()
  return {
    order: 'Take',
    rest: rest
  }
}

const getPutCommand = function (str) {
  const rest = str.split(P.putPattern)[1].trim()
  return {
    order: 'Put',
    rest: rest
  }
}

const getPocketCommand = function (str) {
  return {
    order: 'Pocket',
    rest: ''
  }
}

const getUndefinedCommand = function (str) {
  return {
    order: 'Undefined',
    rest: ''
  }
}

module.exports = {
  getLookCommand,
  getLookAtCommand,
  getGoCommand,
  getTakeCommand,
  getPutCommand,
  getPocketCommand,
  getUndefinedCommand
}
