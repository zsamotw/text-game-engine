import { Action, NextStageAction } from '../../models/action'
import Elem from '../../models/elem'
import {
  NOTHING_CHANGE,
  CHANGE_STAGE,
  TAKE_ELEM_FROM_STAGE,
  PUT_ELEM_INTO_STAGE
} from './action-types'

const nothingChange = () => {
  return {
    type: NOTHING_CHANGE
  } as Action
}

const changeStage = (nextStageId: number) => {
  return {
    type: CHANGE_STAGE,
    nextStageId: nextStageId
  } as NextStageAction
}

const takeElemFromStage = (elem: Elem, currentStageId: number) => {
  return {
    type: TAKE_ELEM_FROM_STAGE,
    elem: elem,
    currentStageId: currentStageId
  }
}

const putElemInToStage = (elem: Elem, currentStageId: number) => {
  return {
    type: PUT_ELEM_INTO_STAGE,
    elem: elem,
    currentStageId: currentStageId
  }
}

export { nothingChange, changeStage, takeElemFromStage, putElemInToStage }
