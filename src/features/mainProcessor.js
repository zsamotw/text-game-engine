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

  switch (type) {
    case 'noChange':
      return {
        state: state,
        message: message
      }
    case 'changeNextStageId': {
      const nextStageId = R.prop('nextStageId', result)
      const newState = R.set(L.stateCurrentStageIdLens, nextStageId, state)
      return {
        state: newState,
        message: message
      }
    }
    case 'addElemToPocket': {
      const elem = R.prop('elem', result)
      const { newState, message } = DF.addElemToPocket(elem, state)
      return {
        state: newState,
        message: message
      }
    }
    case 'putElemToStage': {
      const elem = R.prop('elem', result)
      const { newState, message } = DF.putElemToStage(elem, state)
      return {
        state: newState,
        message: message
      }
    }
    case 'pocket': {
      const message = R.prop('message', result)
      return {
        state: state,
        message: message
      }
    }
    case 'undefinedCommand': {
      const message = R.prop('message', result)
      return {
        state: state,
        message: message
      }
    }
  }
}

module.exports = {
  getResult,
  matchResult
}
