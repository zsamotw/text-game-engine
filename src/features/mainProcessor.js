// Result -> (State, Message)

const R = require('ramda')
const L = require('./lenses')
const CP = require('./commandProcessor.js')
const SP = require('./stringProcessor.js')
const DF = require('./domainFunctions')

const getResult = function (input, gameState) {
  const command = SP.stringMatcher(input)
  return CP.processCommand(command, gameState)
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
    const newState = R.set(L.stateCurrentStageIdLens, nextStageId, state)
    return {
      state: newState,
      message: message
    }
  } else if (R.equals(type, 'addElemToPocket')) {
    const elem = R.prop('elem', result)
    const {
      newState,
      message
    } = DF.addElemToPocket(elem, state)
    return {
      state: newState,
      message: message
    }
  } else if (R.equals(type, 'putElemToStage')) {
    const elem = R.prop('elem', result)
    const {
      newState,
      message
    } = DF.putElemToStage(elem, state)
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
