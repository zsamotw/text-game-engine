
const getLookCommand = function () {
  return { command: 'look', rest: '' }
}

const getLookAtCommand = function (str) {
  const rest = str.split(lookAtPattern)[1]
  return { command: 'LookAt', rest: rest }
}

const getUndefindedCommand = function(str) {
  return { command: 'Undefined', rest: '' }
}
