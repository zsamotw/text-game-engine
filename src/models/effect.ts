import Elem from './elem'
import { currentStageId } from '../state/initial-state'

export interface Effect {
  operation: string
  message: string
}

export interface NextStageEffect extends Effect {
  nextStageId: number
}

export interface ElemEffect extends Effect {
  elem: Elem
  currentStageId: number
}
