
const lookPattern = /^look$/
const lookAtPattern = /^look at/
const goPattern = /^go/

exports.isLookPattern = function (str) {
  return lookPattern.test(str)
}

exports.isLookAtPattern = function (str) {
  return lookAtPattern.test(str)
}

exports.isGoPattern = function (str) {
  return goPattern.test(str)
}

exports.lookAtPattern = lookAtPattern
exports.goPattern = goPattern
