import Element from './element'
import { currentStageId } from '../state/initial-state'

export interface Effect {
  operation: string
  message: string
}

export interface NextStageEffect extends Effect {
  nextStageId: number
}

export interface ElementEffect extends Effect {
  element: Element
  currentStageId: number
}
