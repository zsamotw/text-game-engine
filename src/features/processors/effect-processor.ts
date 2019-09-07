import * as APT from '../../state/actions/pocket-actions'
import * as AST from '../../state/actions/stages-actions'
import * as AMT from '../../state/actions/messages-actions'
import * as ED from '../utils/effect-operations'
import * as EF from '../domain/effect-functions'
import State from '../../models/state'
import Element from '../../models/element'
import { Effect, NextStageEffect, ElementEffect } from '../../models/effect'
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

    case ED.takeElement: {
      const element: Element = EF.getElement(effect as ElementEffect)
      const currentStageId = EF.getCurrentStageId(effect as ElementEffect)

      const takeElementFromStageAction = AST.takeElementFromStage(
        element,
        currentStageId
      )
      const putElementInToPocketAction = APT.putElementInToPocket(element)

      return [
        putElementInToPocketAction,
        takeElementFromStageAction,
        addMessageAction
      ]
    }

    case ED.putElement: {
      const element: Element = EF.getElement(effect as ElementEffect)
      const currentStageId = EF.getCurrentStageId(effect as ElementEffect)

      const takeElementFromPocketAction = APT.takeElementFromPocket(element)
      const putElementToStageAction = AST.putElementInToStage(element, currentStageId)

      return [takeElementFromPocketAction, putElementToStageAction, addMessageAction]
    }

    case ED.undefinedCommand: {
      return [addMessageAction]
    }
    default:
      return []
  }
}

export { getActions }
