import * as P from '../utils/patterns'
import Command from '../../models/command'
import * as SF from '../domain/string-functions'
import * as CO from '../utils/command-order'

const getLookCommand = function(): Command {
  return {
    order: CO.Look,
    rest: ''
  } as Command
}

const getLookAtCommand = function(str: string): Command {
  const rest = SF.splitAndTakeRest(P.lookAtPatternGlobal)(str)
  return {
    order: CO.LookAt,
    rest: rest
  } as Command
}

const getGoCommand = function(str: string): Command {
  const rest = SF.splitAndTakeRest(P.goPatternGlobal)(str)
  return {
    order: CO.Go,
    rest: rest
  } as Command
}

const getTakeCommand = function(str: string): Command {
  const rest = SF.splitAndTakeRest(P.takePatternGlobal)(str)
  return {
    order: CO.Take,
    rest: rest
  } as Command
}

const getPutCommand = function(str: string): Command {
  const rest = SF.splitAndTakeRest(P.putPatternGlobal)(str)
  return {
    order: CO.Put,
    rest: rest
  } as Command
}

const getPocketCommand = function(): Command {
  return {
    order: CO.Pocket,
    rest: ''
  } as Command
}

const getTalkCommand = function(str: string): Command {
  const rest =
    SF.splitAndTakeRest(P.talkToPatternGlobal)(str) ||
    SF.splitAndTakeRest(P.talkWithPatternGlobal)(str)
  return {
    order: CO.Talk,
    rest: rest
  } as Command
}

const getHelpCommand = function(): Command {
  return {
    order: CO.Help,
    rest: ''
  } as Command
}

const getUndefinedCommand = function(str: string): Command {
  return {
    order: CO.Undefined,
    rest: str
  } as Command
}

export {
  getLookCommand,
  getLookAtCommand,
  getGoCommand,
  getTakeCommand,
  getPutCommand,
  getPocketCommand,
  getTalkCommand,
  getHelpCommand,
  getUndefinedCommand
}
