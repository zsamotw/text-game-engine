import * as R from 'ramda'
import {
  stages,
  currentStageId,
  pocket,
  actors,
  systemMessages
} from '../initial-state'
import Stage from '../../models/stage'
import Elem from '../../models/elem'
import { createStore } from 'redux'
import Actor from '../../models/actor'
import * as PF from '../../features/domain/pocket-functions'
import * as AT from '../actions/action-types'

function reduceStages(stagesState: Stage[] = stages, action: any): Stage[] {
  switch (action.type) {
    case AT.NOTHING_CHANGE:
      return stagesState
    case AT.TAKE_ELEM_FROM_STAGE: {
      const { elem, currentStageId } = action
      return R.over(
        R.lensPath([currentStageId, 'elems']),
        R.filter((e: Elem) => e.name !== elem.name),
        stagesState
      )
    }
    case AT.PUT_ELEM_INTO_POCKET: {
      const { elem, currentStageId } = action
      const res = R.over(
        R.lensPath([currentStageId, 'elems']),
        R.append(elem),
        stagesState
      )
      return res
    }
    default:
      return stagesState
  }
}

function reduceCurentStageId(
  state: number = currentStageId,
  action: any
): number {
  switch (action.type) {
    case AT.CHANGE_STAGE:
      const { nextStageId } = action
      return nextStageId
    default:
      return state
  }
}

function reducePocket(pocketState: Elem[] = pocket, action: any): Elem[] {
  switch (action.type) {
    case AT.PUT_ELEM_INTO_POCKET:
      const { elem } = action
      const pocket = PF.addElemTo(elem, pocketState)
      return pocket
    case AT.TAKE_ELEM_FROM_POCKET: {
      const { elem } = action
      const elemsWithDifferentNameTo = R.curry(
        (name: string, elem: Elem) => elem.name !== name
      )
      const pocket = R.filter(elemsWithDifferentNameTo(elem.name), pocketState)
      return pocket
    }
    default:
      return pocketState
  }
}

function reduceActors(state: Actor[] = actors, action: any): Actor[] {
  return state
}

function reduceSystemMessages(
  state: string[] = systemMessages,
  action: any
): string[] {
  return state
}

function reduceState(state: any, action: any) {
  return {
    stages: reduceStages(state.stages, action),
    currentStageId: reduceCurentStageId(state.currentStageId, action),
    pocket: reducePocket(state.pocket, action),
    actors: reduceActors(state.actors, action),
    systemMessages: reduceSystemMessages(state.systemMessages, action)
  }
}

const appStore = createStore(reduceState)

export { appStore }
