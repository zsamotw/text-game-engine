const R = require('ramda')

const {
  stateCurrentStageIdLens
} = require('./lenses')
const Cp = require('./commandProcessor.js')
const {
  stringMatcher
} = require('./stringProcessor.js')
const {
  addElemToPocket,
  putElemToStage
} = require('./domainFunctions')

const getResult = function (input, gameState) {
  console.log(gameState);
  const command = stringMatcher(input)
  return Cp.processCommand(command, gameState)
}

const matchResult = function (result, state) {
  const type = R.prop('type', result)
  const message = R.prop('message', result)
  if (R.equals(type, 'noChange')) {
    return {
      state: state,
      message: message
    }
  } else if (R.equals(type, 'changeNextStageId')) {
    const nextStageId = R.prop('nextStageId', result)
    const newState = R.set(stateCurrentStageIdLens, nextStageId, state)
    return {
      state: newState,
      message: message
    }
  } else if (R.equals(type, 'addElemToPocket')) {
    const elem = R.prop('elem', result)
    const {
      newState,
      message
    } = addElemToPocket(elem, state)
    return {
      state: newState,
      message: message
    }
  } else if (R.equals(type, 'putElemToStage')) {
    const elem = R.prop('elem', result)
    const {
      newState,
      message
    } = putElemToStage(elem, state)
    return {
      state: newState,
      message: message
    }
  } else if (R.equals(type, 'pocket')) {
    const message = R.prop('message', result)
    return {
      state: state,
      message: message
    }
  } else if (R.equals(type, 'undefinedCommand')) {
    const message = R.prop('message', result)
    return {
      state: state,
      message: message
    }
  }
}

module.exports = {
  getResult,
  matchResult
}
