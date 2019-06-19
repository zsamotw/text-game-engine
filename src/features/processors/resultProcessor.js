const R = require('ramda')
const L = require('../utils/lenses')
const CP = require('./commandsProcessor')
const SMH = require('../helpers/stringMatcherHelper')
const PF = require('../domain/pocketFunctions')

// getResult :: String -> State -> Result
const getResult = function (input, gameState) {
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
      const stateWithNewCurrentStage = R.set(L.currentStageIdLens, nextStageId, state)
      return {
        state: stateWithNewCurrentStage,
        message: message
      }
    }
    case 'addElemToPocket': {
      const elem = R.prop('elem', result)
      const stateWithNewElemInPocket = PF.addElemToPocket(elem, state)
      return {
        state: stateWithNewElemInPocket,
        message: message
      }
    }
    case 'putElemToStage': {
      const elem = R.prop('elem', result)
      const stateWithNewElemInStage = PF.putElemToStage(elem, state)
      return {
        state: stateWithNewElemInStage,
        message: message
      }
    }
    case 'pocket': {
      return {
        state: state,
        message: message
      }
    }
    case 'undefinedCommand': {
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
