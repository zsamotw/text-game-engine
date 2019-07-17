export interface Action {
  type: string
}

export interface NextStageAction extends Action {
  nextStageId: number
}
