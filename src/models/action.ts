import Element from './element'

export interface Action {
  type: string
}

export interface NextStageAction extends Action {
  nextStageId: number
}

export interface ElementAction extends Action {
  element: Element
}

export interface ElementInStageAction extends Action {
  element: Element
  currentStageId: number
}

export interface ActorMoveAction extends Action {
  actorId: number
  stageId: number
}
