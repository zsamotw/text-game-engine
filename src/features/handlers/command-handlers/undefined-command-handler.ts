import { Effect } from '../../../models/effect'
import * as CF from '../../domain/command-functions'
import * as EO from '../../utils/effect-operations'
import * as S from 'sanctuary'
import * as NLP from '../../domain/nlp-functions'
import Command from '../../../models/command'
import State from '../../../models/state'
import { settings } from '../../../state/initial-state'

export const getUndefinedEffect = function(command: Command, state: State) {
  const rest = CF.restOfCommand(command)
  const bestMatches = NLP.bestMatches(rest)(settings.commands)(
    settings.minStringDistance
  )
  return {
    operation: EO.UndefinedCommand,
    message: `${
      S.equals(rest)('') ? 'Empty command' : `'${rest}'`
    } is wrong command.${
      S.equals(bestMatches)([])
        ? ''
        : `Similar command are: ${S.joinWith(', ')(bestMatches as string[])}.`
    } \nUse 'help' command to get help`
  } as Effect
}
