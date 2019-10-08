import { Effect } from '../../../models/effect'
import * as EO from '../../utils/effect-operations'
import Command from '../../../models/command'
import State from '../../../models/state'

export const getHelpEffect = function(command: Command, state: State) {
  return {
    operation: EO.UndefinedCommand,
    message:
      'It is possible to use command like: look, look at (name), take (name), put (name), pocket, go (east, south, west, north), talk to (name), help'
  } as Effect
}
