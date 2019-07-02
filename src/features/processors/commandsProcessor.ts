import * as R from 'ramda'
import * as EH from '../helpers/effectHelper'
import State from '../../models/state'
import Command from '../../models/command'

// processCommandAndGetEffect :: String -> State -> Effect
const processCommandAndGetEffect: (
  command: Command,
  state: State
) => any = R.cond([
  [
    (command, state) => R.equals(R.prop('order', command), 'Look'),
    (command, state) => EH.getOverviewEffect(state)
  ],
  [
    (command, state) => R.equals(R.prop('order', command), 'LookAt'),
    (command, state) => EH.getDescriptionEffect(command, state)
  ],
  [
    (command, state) => R.equals(R.prop('order', command), 'Go'),
    (command, state) => EH.getChangeStageEffect(command, state)
  ],
  [
    (command, state) => R.equals(R.prop('order', command), 'Take'),
    (command, state) => EH.getTakenElemEffect(command, state)
  ],
  [
    (command, state) => R.equals(R.prop('order', command), 'Put'),
    (command, state) => EH.getPutElemEffect(command, state)
  ],
  [
    (command, state) => R.equals(R.prop('order', command), 'Pocket'),
    (command, state) => EH.getPocketEffect(command, state)
  ],
  [
    (command, state) => R.equals(R.prop('order', command), 'Undefined'),
    (command, state) => EH.getUndefinedEffect(command, state)
  ],
  [R.T, (command, state) => 'Errorrrr!!!']
])

export { processCommandAndGetEffect as processCommandAndGetResult }
