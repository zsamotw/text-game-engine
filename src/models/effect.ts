import Element from './element'
import { EffectOperation } from '../features/utils/effect-operations'

export interface Effect {
  operation: EffectOperation
  message: string
}

export interface NextStageEffect extends Effect {
  nextStageId: number
}

export interface ElementEffect extends Effect {
  element: Element
  currentStageId: number
}
