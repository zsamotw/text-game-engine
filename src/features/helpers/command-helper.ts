import * as P from '../utils/patterns'
import Command from '../../models/command'
import * as SF from '../domain/string-functions'

const getLookCommand = function(): Command {
  return {
    order: 'Look',
    rest: ''
  } as Command
}

const getLookAtCommand = function(str: string): Command {
  const rest = SF.splitAndTakeRest(P.lookAtPatternGlobal)(str)
  return {
    order: 'Look At',
    rest: rest
  } as Command
}

const getGoCommand = function(str: string): Command {
  const rest = SF.splitAndTakeRest(P.goPatternGlobal)(str)
  return {
    order: 'Go',
    rest: rest
  } as Command
}

const getTakeCommand = function(str: string): Command {
  const rest = SF.splitAndTakeRest(P.takePatternGlobal)(str)
  return {
    order: 'Take',
    rest: rest
  } as Command
}

const getPutCommand = function(str: string): Command {
  const rest = SF.splitAndTakeRest(P.putPatternGlobal)(str)
  return {
    order: 'Put',
    rest: rest
  } as Command
}

const getPocketCommand = function(): Command {
  return {
    order: 'Pocket',
    rest: ''
  } as Command
}

const getTalkCommand = function(str: string): Command {
  const rest =
    SF.splitAndTakeRest(P.talkToPatternGlobal)(str) ||
    SF.splitAndTakeRest(P.talkWithPatternGlobal)(str)
  return {
    order: 'Talk',
    rest: rest
  } as Command
}

const getHelpCommand = function(): Command {
  return {
    order: 'Help',
    rest: ''
  } as Command
}

const getUndefinedCommand = function(str: string): Command {
  return {
    order: 'Undefined',
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
