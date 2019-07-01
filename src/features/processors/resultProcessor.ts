import * as R from 'ramda'
import * as L from '../utils/lenses'
import * as CP from './commandsProcessor'
import * as SMH from '../helpers/stringMatcherHelper'
import * as PF from '../domain/pocketFunctions'
import * as RT from '../utils/resultTypes'
import * as RF from '../domain/resultFunctions'
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
  const type = RF.getType(result)
  const message = RF.getMessage(result)

  switch (type) {
    case RT.noStateChange:
      return {
        state: state,
        message: message
      }
    case RT.changeNextStageId: {
      const nextStageId = RF.getNextStatgeId(result)
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
      const elem: Elem = RF.getElem(result)
      const addAndRemoveElem = R.compose(
        PF.removeElemFromStage,
        PF.addElemToPocket
      )
      const stateAfterTakeElem = addAndRemoveElem(elem, state)

      return {
        state: stateAfterTakeElem,
        message: message
      }
    }
    case RT.putElem: {
      const elem: Elem = RF.getElem(result)
      const stateAfterPutElem = PF.putElemToStage(elem, state)
      return {
        state: stateAfterPutElem,
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

export { getResult, getNewStateAndMessage }
