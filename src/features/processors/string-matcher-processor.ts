import * as CH from '../helpers/command-helper'
import { match } from 'minta'
import * as P from '../utils/patterns'

const matchStringAndGetCommand = (str: string) => {
  return match(str)(
    P.lookPattern,
    () => CH.getLookCommand(),
    P.lookAtPattern,
    () => CH.getLookAtCommand(str),
    P.goPattern,
    () => CH.getGoCommand(str),
    P.takePattern,
    () => CH.getTakeCommand(str),
    P.putPattern,
    () => CH.getPutCommand(str),
    P.pocketPattern,
    () => CH.getPocketCommand(),
    P.talkToPattern,
    () => CH.getTalkCommand(str),
    P.talkWithPattern,
    () => CH.getTalkCommand(str),
    P.helpPattern,
    () => CH.getHelpCommand(),
    otherwise => CH.getUndefinedCommand(str)
  )
}

export { matchStringAndGetCommand }
