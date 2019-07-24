import * as R from 'ramda'
import * as EH from '../helpers/effect-helper'
import State from '../../models/state'
import Command from '../../models/command'

// processCommandAndGetEffect :: String -> State -> Effect
const processCommandAndGetEffect: (
  command: Command,
  state: State
) => any = R.cond([
  [
    (command, state) => R.equals(R.prop('order', command), 'Look'),
    (command, state) => {
      const { stages, actors, currentStageId } = state
      return EH.getOverviewEffect(stages, actors, currentStageId)
    }
  ],
  [
    (command, state) => R.equals(R.prop('order', command), 'LookAt'),
    (command, state) => {
      const { stages, currentStageId } = state
      return EH.getDescriptionEffect(command, stages, currentStageId)
    }
  ],
  [
    (command, state) => R.equals(R.prop('order', command), 'Go'),
    (command, state) => {
      const { stages, currentStageId } = state
      return EH.getChangeStageEffect(command, stages, currentStageId)
    }
  ],
  [
    (command, state) => R.equals(R.prop('order', command), 'Take'),
    (command, state) => {
      const { stages, currentStageId, pocket } = state
      return EH.getTakenElemEffect(command, stages, currentStageId, pocket)
    }
  ],
  [
    (command, state) => R.equals(R.prop('order', command), 'Put'),
    (command, state) => {
      const { stages, currentStageId, pocket } = state
      return EH.getPutElemEffect(command, stages, currentStageId, pocket)
    }
  ],
  [
    (command, state) => R.equals(R.prop('order', command), 'Pocket'),
    (command, state) => {
      const { pocket } = state
      return EH.getPocketEffect(command, pocket)
    }
  ],
  [
    (command, state) => R.equals(R.prop('order', command), 'Undefined'),
    (command, state) => EH.getUndefinedEffect(command, state)
  ],
  [R.T, (command, state) => 'Errorrrr!!!']
])

export { processCommandAndGetEffect }
