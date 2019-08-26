import * as APT from '../../state/actions/pocket-actions'
import * as AST from '../../state/actions/stages-actions'
import * as AMT from '../../state/actions/messages-actions'
import * as ED from '../utils/effect-operations'
import * as EF from '../domain/effect-functions'
import State from '../../models/state'
import Elem from '../../models/elem'
import { Effect, NextStageEffect, ElemEffect } from '../../models/effect'
import { changeStage } from '../../state/actions/stages-actions'
import { Action } from '../../models/action'

// getActions :: Effect -> State ->  Action[]
const getActions = function(effect: Effect, state: State): Action[] {
  const operation = EF.getOperation(effect)
  const message = EF.getMessage(effect)
  const addMessageAction = AMT.addMessage(message)

  switch (operation) {
    case ED.noStateChange:
      return [addMessageAction]

    case ED.changeNextStageId: {
      const nextStageId = EF.getNextStageId(effect as NextStageEffect)
      const changeNextStageIdAction = changeStage(nextStageId)
      return [changeNextStageIdAction, addMessageAction]
    }

    case ED.takeElem: {
      const elem: Elem = EF.getElem(effect as ElemEffect)
      const currentStageId = EF.getCurrentStageId(effect as ElemEffect)

      const takeElemFromStageAction = AST.takeElemFromStage(
        elem,
        currentStageId
      )
      const putElemInToPocketAction = APT.putElemInToPocket(elem)

      return [
        putElemInToPocketAction,
        takeElemFromStageAction,
        addMessageAction
      ]
    }

    case ED.putElem: {
      const elem: Elem = EF.getElem(effect as ElemEffect)
      const currentStageId = EF.getCurrentStageId(effect as ElemEffect)

      const takeElemFromPocketAction = APT.takeElemFromPocket(elem)
      const putElemToStageAction = AST.putElemInToStage(elem, currentStageId)

      return [takeElemFromPocketAction, putElemToStageAction, addMessageAction]
    }

    case ED.undefinedCommand: {
      return [addMessageAction]
    }
    default:
      return []
  }
}

export { getActions }
