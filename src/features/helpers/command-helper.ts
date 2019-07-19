import * as P from '../utils/patterns'
import Command from '../../models/command'

const getLookCommand = function(): Command {
  return {
    order: 'Look',
    rest: ''
  } as Command
}

const getLookAtCommand = function(str: string): Command {
  const rest = str.split(P.lookAtPattern)[1].trim()
  return {
    order: 'LookAt',
    rest: rest
  } as Command
}

const getGoCommand = function(str: string): Command {
  const rest = str.split(P.goPattern)[1].trim()
  return {
    order: 'Go',
    rest: rest
  } as Command
}

const getTakeCommand = function(str: string): Command {
  const rest = str.split(P.takePattern)[1].trim()
  return {
    order: 'Take',
    rest: rest
  } as Command
}

const getPutCommand = function(str: string): Command {
  const rest = str.split(P.putPattern)[1].trim()
  return {
    order: 'Put',
    rest: rest
  } as Command
}

const getPocketCommand = function(str: string): Command {
  return {
    order: 'Pocket',
    rest: ''
  } as Command
}

const getUndefinedCommand = function(str: string): Command {
  return {
    order: 'Undefined',
    rest: ''
  } as Command
}

export {
  getLookCommand,
  getLookAtCommand,
  getGoCommand,
  getTakeCommand,
  getPutCommand,
  getPocketCommand,
  getUndefinedCommand
}
