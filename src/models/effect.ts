import Elem from './elem'

export interface Effect {
  effectType: string
  message: string
}

export interface NextStageEffect extends Effect {
  nextStageId: number
}

export interface ElemEffect extends Effect {
  elem: Elem
}

export interface ElemsEffect extends Effect {
  elems: Elem[]
}
