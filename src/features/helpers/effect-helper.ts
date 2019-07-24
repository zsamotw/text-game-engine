import { Effect, NextStageEffect, ElemEffect } from '../../models/effect'
import * as AF from '../domain/actor-functions'
import * as CF from '../domain/command-functions'
import * as CP from '../processors/commands-processor'
import * as DF from '../domain/door-functions'
import * as EO from '../utils/effect-operations'
import * as GH from './generic-helper'
import * as L from '../utils/lenses'
import * as PF from '../domain/pocket-functions'
import * as R from 'ramda'
import * as SF from '../domain/stage-functions'
import * as SMH from './string-matcher-helper'
import Actor from '../../models/actor'
import Command from '../../models/command'
import Elem from '../../models/elem'
import Stage from '../../models/stage'
import State from '../../models/state'

// getEffect :: String -> State -> Effect
const getEffect = function(input: string, state: State) {
  const command = SMH.stringMatcher(input as never)
  return CP.processCommandAndGetEffect(command, state)
}

const getOverviewEffect = function(
  stages: Stage[],
  actors: Actor[],
  currentStageId: number
) {
  const currentStage = SF.getStage(stages, currentStageId)

  if (R.isNil(currentStage)) {
    return {
      operation: EO.noStateChange,
      message: 'Error. No stage defined as current. Contact with game owner.'
    } as Effect
  } else {
    const getName = R.prop('name')

    const elemsNamesForCurrentStage = R.map(
      getName,
      SF.getElemsForStage(currentStage)
    )

    const actorNamesForCurrentStage: string[] = R.map(
      getName,
      AF.getActorsForStage(actors, currentStageId)
    )

    const elemsOnStage =
      elemsNamesForCurrentStage.length > 0
        ? `Things: ${elemsNamesForCurrentStage}.`
        : 'No one thing here.'
    const actorsOnStage =
      actorNamesForCurrentStage.length > 0
        ? `Persons: ${actorNamesForCurrentStage}.`
        : 'Nobody here.'

    const res = {
      operation: EO.noStateChange,
      message: `${GH.descriptionOf(currentStage)}
                ${elemsOnStage}
                ${actorsOnStage}`
    } as Effect
    return res
  }
}

const getDescriptionEffect = function(
  command: Command,
  stages: Stage[],
  currentStageId: number
) {
  const getElemEqualsTo = CF.getElemEqualsToCommand
  const fromElemsInCurrentStage = R.compose(
    SF.getElemsForStage,
    SF.getStage
  )

  const elem = getElemEqualsTo(command)(
    fromElemsInCurrentStage(stages, currentStageId)
  )

  if (R.isNil(elem)) {
    return {
      operation: EO.noStateChange,
      message: 'No such elem in this stage'
    } as Effect
  } else {
    return {
      operation: EO.noStateChange,
      message: GH.descriptionOf(elem)
    } as Effect
  }
}

const getChangeStageEffect = function(
  command: Command,
  stages: Stage[],
  currentStageId: number
) {
  const directionFrom: (command: Command) => string = R.view(L.restLens)
  const doorsInCurrenStage = DF.getDoorsForStage(stages, currentStageId)
  const operation = directionFrom(command)

  const nextStageId = R.prop(operation as any, doorsInCurrenStage)

  const nextStage = R.find(R.propEq('id', nextStageId), stages) as Stage

  const nextStageName = GH.nameOf(nextStage)

  if (R.isNil(nextStageId)) {
    return {
      operation: EO.noStateChange,
      message: 'Oopps. Something wrong. You can not go this operation.'
    } as Effect
  } else {
    return {
      operation: EO.changeNextStageId,
      nextStageId: nextStageId,
      message: `You are in  ${nextStageName}`
    } as NextStageEffect
  }
}

const getTakenElemEffect = function(
  command: Command,
  stages: Stage[],
  currentStageId: number,
  pocket: Elem[]
) {
  const getElemEqualsTo = CF.getElemEqualsToCommand
  const currentStage = SF.getStage(stages, currentStageId)
  const FromElemsOnCurrentStage = SF.getElemsForStage(currentStage)

  const takenElem = getElemEqualsTo(command)(FromElemsOnCurrentStage)
  const isPlace = PF.isPlaceInPocket(pocket)

  switch (true) {
    case !isPlace: {
      return {
        operation: EO.noStateChange,
        message: 'No place in pocket'
      } as Effect
    }
    case isPlace && !R.isNil(takenElem):
      return {
        operation: EO.takeElem,
        elem: takenElem,
        currentStageId: currentStageId,
        message: `${GH.nameOf(takenElem as Elem)} is taken`
      } as ElemEffect
    case isPlace && R.isNil(takenElem):
      return {
        operation: EO.noStateChange,
        message: 'No such elem in this stage'
      } as Effect
  }
}

const getPutElemEffect = function(
  command: Command,
  stages: Stage[],
  currentStageId: number,
  pocket: Elem[]
) {
  const getElemEqualsTo = CF.getElemEqualsToCommand

  const elemFromPocket = getElemEqualsTo(command)(pocket)

  if (R.isNil(elemFromPocket)) {
    return {
      operation: EO.noStateChange,
      message: 'No such elem in pocket'
    } as Effect
  } else {
    return {
      operation: EO.putElem,
      elem: elemFromPocket,
      currentStageId: currentStageId,
      message: `${GH.nameOf(elemFromPocket)} is now put to the ground.`
    } as ElemEffect
  }
}

const getPocketEffect = function(command: Command, pocket: Elem[]) {
  const getElemsNamesFrom = R.map(R.prop('name'))
  const elemsInPocket = getElemsNamesFrom(pocket)

  return {
    operation: EO.noStateChange,
    message:
      elemsInPocket.length > 0
        ? `In your pocket: ${elemsInPocket}`
        : 'You pocket is empty'
  } as Effect
}

const getUndefinedEffect = function(command: Command, state: State) {
  return {
    operation: EO.undefinedCommand,
    message: `ooops!! it is wrong command.`
  } as Effect
}

export {
  getEffect,
  getOverviewEffect,
  getDescriptionEffect,
  getChangeStageEffect,
  getTakenElemEffect,
  getPutElemEffect,
  getPocketEffect,
  getUndefinedEffect
}
