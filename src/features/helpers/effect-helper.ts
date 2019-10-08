import * as CP from '../processors/commands-processor'
import * as SMP from '../processors/string-matcher-processor'
import State from '../../models/state'

// getEffect :: String -> State -> Effect
export const getEffect = function(input: string, state: State) {
  const command = SMP.matchStringAndGetCommand(input)
  return CP.processCommandAndGetEffect(command, state)
}
