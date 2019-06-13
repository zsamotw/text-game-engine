const R = require('ramda')
const L = require('../elements/lenses')
const CP = require('./commandsProcessor')
const SMH = require('../helpers/stringMatcherHelper')
const PF = require('../domain/pocketFunctions')

// getResult :: String -> State -> Result
const getResult = function (input, gameState) {
  console.log('in get new state and message')
  const command = SMH.stringMatcher(input)
  return CP.processCommandAndGetResult(command, gameState)
}

// getNewStateAndMessage :: Result -> State -> {state: State, message: Message}
const getNewStateAndMessage = function (result, state) {
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
      const { newState, message } = PF.addElemToPocket(elem, state)
      return {
        state: newState,
        message: message
      }
    }
    case 'putElemToStage': {
      const elem = R.prop('elem', result)
      const { newState, message } = PF.putElemToStage(elem, state)
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
  getNewStateAndMessage
}
