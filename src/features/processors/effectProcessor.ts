import * as R from 'ramda'
import * as L from '../utils/lenses'
import * as CP from './commandsProcessor'
import * as SMH from '../helpers/stringMatcherHelper'
import * as PF from '../domain/pocketFunctions'
import * as ED from '../utils/effectDirections'
import * as EF from '../domain/effectFunctions'
import State from '../../models/state'
import Elem from '../../models/elem'
import { Effect, NextStageEffect, ElemEffect } from '../../models/effect'

// getEffect :: String -> State -> Effect
const getEffect = function(input: string, state: State) {
  const command = SMH.stringMatcher(input as never)
  return CP.processCommandAndGetResult(command, state)
}

// getNewStateAndMessage :: Result -> State -> {state: State, message: Message}
const getNewStateAndMessage = function(effect: Effect, state: State) {
  const type = EF.getType(effect)
  const message = EF.getMessage(effect)

  switch (type) {
    case ED.noStateChange:
      return {
        state: state,
        message: message
      }
    case ED.changeNextStageId: {
      const nextStageId = EF.getNextStatgeId(effect as NextStageEffect)
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
    case ED.takeElem: {
      const elem: Elem = EF.getElem(effect as ElemEffect)
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
    case ED.putElem: {
      const elem: Elem = EF.getElem(effect as ElemEffect)
      const stateAfterPutElem = PF.putElemToStage(elem, state)
      return {
        state: stateAfterPutElem,
        message: message
      }
    }
    case ED.pocket: {
      return {
        state: state,
        message: message
      }
    }
    case ED.undefinedCommand: {
      return {
        state: state,
        message: message
      }
    }
  }
}

export { getEffect as getResult, getNewStateAndMessage }
