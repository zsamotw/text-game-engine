import * as APT from '../../state/actions/pocket-actions'
import * as AST from '../../state/actions/stages-actions'
import * as ED from '../utils/effect-operations'
import * as EF from '../domain/effect-functions'
import State from '../../models/state'
import Elem from '../../models/elem'
import { Effect, NextStageEffect, ElemEffect } from '../../models/effect'
import { changeStage } from '../../state/actions/stages-actions'

// getNewStateAndMessage :: Effect -> State -> {actions: Action[], message: Message}
const getActionsAndMessage = function(effect: Effect, state: State) {
  const operation = EF.getOperation(effect)
  const message = EF.getMessage(effect)

  switch (operation) {
    case ED.noStateChange:
      return {
        actions: [],
        message: message
      }

    case ED.changeNextStageId: {
      const nextStageId = EF.getNextStageId(effect as NextStageEffect)
      const changeNextStageIdAction = changeStage(nextStageId)
      return {
        actions: [changeNextStageIdAction],
        message: message
      }
    }

    case ED.takeElem: {
      const elem: Elem = EF.getElem(effect as ElemEffect)
      const currentStageId = EF.getCurrentStageId(effect as ElemEffect)

      const takeElemFromStageAction = AST.takeElemFromStage(
        elem,
        currentStageId
      )
      const putElemInToPocketAction = APT.putElemInToPocket(elem)

      return {
        actions: [putElemInToPocketAction, takeElemFromStageAction],
        message: message
      }
    }

    case ED.putElem: {
      const elem: Elem = EF.getElem(effect as ElemEffect)
      const currentStageId = EF.getCurrentStageId(effect as ElemEffect)

      const takeElemFromPocketAction = APT.takeElemFromPocket(elem)
      const putElemToStageAction = AST.putElemInToStage(elem, currentStageId)

      return {
        actions: [takeElemFromPocketAction, putElemToStageAction],
        message: message
      }
    }

    case ED.undefinedCommand: {
      return {
        actions: [],
        message: message
      }
    }
  }
}

export { getActionsAndMessage }
