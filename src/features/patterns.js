
const lookPattern = /^look$/
const lookAtPattern = /^look at/


const isLookPattern = function (str) {
  return lookPattern.test(str)
}

const isLookAtPattern = function (str) {
  return lookAtPattern.test(str)
}

