import {
  NextStageAction,
  ElementInStageAction
} from '../../models/action'
import Element from '../../models/element'
import {
  CHANGE_STAGE,
  TAKE_ELEMENT_FROM_STAGE,
  PUT_ELEMENT_INTO_STAGE
} from './action-types'

const changeStage = (nextStageId: number) => {
  return {
    type: CHANGE_STAGE,
    nextStageId: nextStageId
  } as NextStageAction
}

const takeElementFromStage = (element: Element, currentStageId: number) => {
  return {
    type: TAKE_ELEMENT_FROM_STAGE,
    element: element,
    currentStageId: currentStageId
  } as ElementInStageAction
}

const putElementInToStage = (element: Element, currentStageId: number) => {
  return {
    type: PUT_ELEMENT_INTO_STAGE,
    element: element,
    currentStageId: currentStageId
  } as ElementInStageAction
}

export { changeStage, takeElementFromStage, putElementInToStage }
