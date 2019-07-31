import Elem from './elem'

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

export interface ActorMoveAction extends Action {
  actorId: number
  stageId: number
}
