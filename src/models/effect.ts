import Elem from './elem'

export interface Effect {
  direction: string
  message: string
}

export interface NextStageEffect extends Effect {
  nextStageId: number
}

export interface ElemEffect extends Effect {
  elem: Elem
}
