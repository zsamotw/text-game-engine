import {
  stages,
  currentStageId,
  pocket,
  actors,
  messages,
  commandsHistory,
  settings
} from '../initial-state'
import { createStore } from 'redux'
import * as AT from '../actions/action-types'
import * as L from '../../features/utils/lenses'
import * as PF from '../../features/domain/pocket-functions'
import * as S from 'sanctuary'
import Actor from '../../models/actor'
import CommandsHistory from '../../models/commandsHistory'
import Element from '../../models/element'
import Stage from '../../models/stage'
import Settings from '../../models/settings'
const { size } = require('sanctuary')

function reduceStages(stagesState: Stage[] = stages, action: any): Stage[] {
  switch (action.type) {
    case AT.NOTHING_CHANGE:
      return stagesState

    case AT.TAKE_ELEMENT_FROM_STAGE: {
      const { element, currentStageId } = action
      const stages = L.stagesLens[currentStageId].elements.set(es =>
        es.filter(e => e.name !== element.name)
      )
      return stages(stagesState)
    }

    case AT.PUT_ELEMENT_INTO_STAGE: {
      const { element, currentStageId } = action
      const stages = L.stagesLens[currentStageId].elements.set(es =>
        S.append(element)(es)
      )
      return stages(stagesState)
    }

    default:
      return stagesState
  }
}

function reduceCurrentStageId(
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

function reducePocket(pocketState: Element[] = pocket, action: any): Element[] {
  switch (action.type) {
    case AT.PUT_ELEMENT_INTO_POCKET:
      const { element } = action
      const pocket = PF.addElementTo(element, pocketState)
      return pocket

    case AT.TAKE_ELEMENT_FROM_POCKET: {
      const { element } = action
      const elementsWithDifferentNameTo = S.curry2(
        (name: string, element: Element) => element.name !== name
      )
      const pocket = S.filter(elementsWithDifferentNameTo(element.name))(
        pocketState
      )
      return pocket
    }

    default:
      return pocketState
  }
}

function reduceActors(actorState: Actor[] = actors, action: any): Actor[] {
  switch (action.type) {
    case AT.CHANGE_ACTOR_STAGE:
      const { stageId, actorId } = action
      const actors = S.map((actor: Actor) => {
        if (actor.id === actorId)
          return L.actorLens.stageId.set(id => stageId)(actor)
        else return actor
      })(actorState)
      return actors

    default:
      return actorState
  }
}

function reduceMessages(
  messagesState: string[] = messages,
  action: any
): string[] {
  switch (action.type) {
    case AT.ADD_MESSAGE:
      const { message } = action
      return S.prepend(message)(messagesState)

    default:
      return messagesState
  }
}

function reduceCommandsHistory(
  commandsHistoryState: CommandsHistory = commandsHistory,
  action: any
): CommandsHistory {
  switch (action.type) {
    case AT.ADD_COMMAND:
      const { command } = action
      const addCommand = L.commandHistoryLens.commands.set(commands =>
        S.prepend(command)(commands)
      )
      const resetPosition = L.commandHistoryLens.position.set(position => 0)
      return S.compose(resetPosition)(addCommand)(commandsHistoryState)

    case AT.SET_NEXT_COMMAND_HISTORY_POSITION:
      if (
        S.lt(size(commandsHistoryState.commands) - 1)(
          commandsHistoryState.position
        )
      )
        return L.commandHistoryLens.position.set(p => p + 1)(
          commandsHistoryState
        )
      else
        return L.commandHistoryLens.position.set(p => 0)(commandsHistoryState)

    case AT.SET_PREVIOUS_COMMAND_HISTORY_POSITION:
      if (S.lt(commandsHistoryState.position)(0))
        return L.commandHistoryLens.position.set(p => p - 1)(
          commandsHistoryState
        )
      else
        return L.commandHistoryLens.position.set(
          p => size(commandsHistoryState.commands) - 1
        )(commandsHistoryState)

    default:
      return commandsHistoryState
  }
}
function reduceSettings(
  settingsState: Settings = settings,
  action: any
): Settings {
  switch (action.type) {
    default:
      return settingsState
  }
}

function reduceState(state: any = {}, action: any) {
  return {
    stages: reduceStages(state.stages, action),
    currentStageId: reduceCurrentStageId(state.currentStageId, action),
    pocket: reducePocket(state.pocket, action),
    actors: reduceActors(state.actors, action),
    messages: reduceMessages(state.messages, action),
    commandsHistory: reduceCommandsHistory(state.commandsHistory, action),
    settings: reduceSettings(state.settings, action)
  }
}

const appStore = createStore(
  reduceState,
  (window as any).__REDUX_DEVTOOLS_EXTENSION__ &&
    (window as any).__REDUX_DEVTOOLS_EXTENSION__()
)

export { appStore }
