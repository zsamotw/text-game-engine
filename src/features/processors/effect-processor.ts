import * as APT from '../../state/actions/pocket-actions'
import * as AST from '../../state/actions/stages-actions'
import * as AMT from '../../state/actions/messages-actions'
import * as EO from '../utils/effect-operations'
import * as EF from '../domain/effect-functions'
import State from '../../models/state'
import Element from '../../models/element'
import { Effect, NextStageEffect, ElementEffect } from '../../models/effect'
import { changeStage } from '../../state/actions/stages-actions'
import { Action } from '../../models/action'

// getActions :: Effect -> State ->  Action[]
const getActions = function(effect: Effect, state: State): Action[] {
  const operation = EF.operationOf(effect)
  const message = EF.messageOf(effect)
  const addMessageAction = AMT.addMessage(message)

  switch (operation) {
    case EO.NoStateChange:
      return [addMessageAction]

    case EO.ChangeNextStageId: {
      const nextStageId = EF.nextStageIdOf(effect as NextStageEffect)
      const changeNextStageIdAction = changeStage(nextStageId)
      return [changeNextStageIdAction, addMessageAction]
    }

    case EO.TakeElement: {
      const element: Element = EF.elementOf(effect as ElementEffect)
      const currentStageId = EF.currentStageIdOf(effect as ElementEffect)

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

    case EO.PutElement: {
      const element: Element = EF.elementOf(effect as ElementEffect)
      const currentStageId = EF.currentStageIdOf(effect as ElementEffect)

      const takeElementFromPocketAction = APT.takeElementFromPocket(element)
      const putElementToStageAction = AST.putElementInToStage(
        element,
        currentStageId
      )

      return [
        takeElementFromPocketAction,
        putElementToStageAction,
        addMessageAction
      ]
    }

    case EO.UndefinedCommand: {
      return [addMessageAction]
    }
    default:
      return []
  }
}

export { getActions }
