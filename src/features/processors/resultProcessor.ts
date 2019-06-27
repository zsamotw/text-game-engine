import * as R from 'ramda'
import * as L from '../utils/lenses'
import * as CP from './commandsProcessor'
import * as SMH from '../helpers/stringMatcherHelper'
import * as PF from '../domain/pocketFunctions'
import * as RT from '../utils/resultTypes'
import State from '../../models/state'
import Elem from '../../models/elem'
import Result from '../../models/result'

// getResult :: String -> State -> Result
const getResult = function(input: string, state: State) {
  const command = SMH.stringMatcher(input as never)
  return CP.processCommandAndGetResult(command, state)
}

// getNewStateAndMessage :: Result -> State -> {state: State, message: Message}
const getNewStateAndMessage = function(result: Result, state: State) {
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
      const stateWithNewCurrentStage = R.set(
        L.currentStageIdLens,
        nextStageId,
        state
      )
      return {
        state: stateWithNewCurrentStage,
        message: message
      }
    }
    case RT.takeElem: {
      const elem: Elem = R.view(L.elemLens, result)
      const stateWithNewElemInPocket = PF.addElemToPocket(elem, state)
      return {
        state: stateWithNewElemInPocket,
        message: message
      }
    }
    case RT.putElem: {
      const elem: Elem = R.view(L.elemLens, result)
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
