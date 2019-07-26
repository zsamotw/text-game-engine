import Elem from './elem'
import { nextStageId } from '../features/utils/lenses'
import { currentStageId } from '../state/initial-state'

export interface Action {
  type: string
}

export interface NextStageAction extends Action {
  nextStageId: number
}

export interface ElemAction extends Action {
  elem: Elem
}

export interface ElemInStageAction extends Action {
  elem: Elem
  currentStageId: number
}
