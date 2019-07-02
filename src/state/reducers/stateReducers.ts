import { stages, currentStageId, pocket } from '../initialState'
import Stage from '../../models/stage'
import Elem from '../../models/elem'
import State from '../../models/state'

function reduceStages(state: Stage[] = stages, action: any): Stage[] {
  switch (action.type) {
    case 'NO_STAGE_CHANGE':
      return state
    default:
      return state
  }
}

function reduceCurentStageId(
  state: number = currentStageId,
  action: any
): number {
  switch (action.type) {
    case 'CHANGE_STAGE':
      return state
    default:
      return state
  }
}

function reducePocket(state: Elem[] = pocket, action: any): Elem[] {
  switch (action.type) {
    case 'ADD_ELEM_TP_POCKET':
      return state
    default:
      return state
  }
}

function appStore(state: State, action: any) {
  return {
    stages: reduceStages(state.stages, action),
    currentStageId: reduceCurentStageId(state.currentStageId, action),
    pocket: reducePocket(state.pocket, action)
  }
}
