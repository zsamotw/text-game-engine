import * as R from 'ramda'
import * as L from '../utils/lenses'
import * as PF from '../domain/pocket-functions'
import * as ED from '../utils/effect-directions'
import * as EF from '../domain/effect-functions'
import State from '../../models/state'
import Elem from '../../models/elem'
import { Effect, NextStageEffect, ElemEffect } from '../../models/effect'

// getNewStateAndMessage :: Result -> State -> {state: State, message: Message}
const getNewStateAndMessage = function(effect: Effect, state: State) {
  const direction = EF.getDirection(effect)
  const message = EF.getMessage(effect)

  switch (direction) {
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

export { getNewStateAndMessage }
