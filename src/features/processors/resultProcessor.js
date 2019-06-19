const R = require('ramda')
const L = require('../utils/lenses')
const CP = require('./commandsProcessor')
const SMH = require('../helpers/stringMatcherHelper')
const PF = require('../domain/pocketFunctions')
const RT = require('../utils/resultTypes')

// getResult :: String -> State -> Result
const getResult = function (input, state) {
  const command = SMH.stringMatcher(input)
  return CP.processCommandAndGetResult(command, state)
}

// getNewStateAndMessage :: Result -> State -> {state: State, message: Message}
const getNewStateAndMessage = function (result, state) {
  const type = R.view(L.typeLens, result)
  const message = R.view(L.messageLens, result)

  switch (type) {
    case RT.noStateChange:
      return {
        state: state,
        message: message
      }
    case RT.changeNextStageId: {
      const nextStageId = R.view(L.nextStageId, result)
      const stateWithNewCurrentStage = R.set(L.currentStageIdLens, nextStageId, state)
      return {
        state: stateWithNewCurrentStage,
        message: message
      }
    }
    case RT.takeElem: {
      const elem = R.view(L.elemLens, result)
      const stateWithNewElemInPocket = PF.addElemToPocket(elem, state)
      return {
        state: stateWithNewElemInPocket,
        message: message
      }
    }
    case RT.putElem: {
      const elem = R.view(L.elemLens, result)
      const stateWithNewElemOnStage = PF.putElemToStage(elem, state)
      return {
        state: stateWithNewElemOnStage,
        message: message
      }
    }
    case RT.pocket: {
      return {
        state: state,
        message: message
      }
    }
    case RT.undefinedCommand: {
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
