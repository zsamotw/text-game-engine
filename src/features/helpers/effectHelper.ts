import * as AF from '../domain/actorFunctions'
import * as CF from '../domain/commandFunctions'
import * as CP from '../processors/commandsProcessor'
import * as DF from '../domain/doorFunctions'
import * as ED from '../utils/effectDirections'
import * as GH from './genericHelper'
import * as L from '../utils/lenses'
import * as PF from '../domain/pocketFunctions'
import * as R from 'ramda'
import * as SF from '../domain/stageFunctions'
import * as SMH from '../helpers/stringMatcherHelper'
import Command from '../../models/command'
import Elem from '../../models/elem'
import Stage from '../../models/stage'
import State from '../../models/state'
import { Effect, NextStageEffect, ElemEffect } from '../../models/effect'

// getEffect :: String -> State -> Effect
const getEffect = function(input: string, state: State) {
  const command = SMH.stringMatcher(input as never)
  return CP.processCommandAndGetResult(command, state)
}

const getOverviewEffect = function(state: State) {
  const stage = SF.getCurrentStage(state)

  if (R.isNil(stage)) {
    return {
      direction: ED.noStateChange,
      message: 'Error. No stage defined as current. Contact with game owner.'
    } as Effect
  } else {
    const getName = R.prop('name')
    const elemsNamesForCurrentStage = R.map(
      getName,
      SF.getElemsForCurrentStage(state)
    )
    const actorNamesForCurrentStage: string[] = R.map(
      getName,
      AF.getActorsForCurrentStage(state)
    )
    const elemsOnSTage =
      elemsNamesForCurrentStage.length > 0
        ? `Things: ${elemsNamesForCurrentStage}.`
        : 'No one thing here.'
    const actorsOnSTage =
      actorNamesForCurrentStage.length > 0
        ? `Persons: ${actorNamesForCurrentStage}.`
        : 'Nobody here.'

    return {
      direction: ED.noStateChange,
      message: `${GH.descriptionOf(stage)}
                ${elemsOnSTage}
                ${actorsOnSTage}`
    } as Effect
  }
}

const getDescriptionEffect = function(command: Command, state: State) {
  const getElemEqualsTo = CF.getElemEqualsToCommand
  const fromCurrentStage = SF.getElemsForCurrentStage(state)

  const elem = getElemEqualsTo(command)(fromCurrentStage)

  if (R.isNil(elem)) {
    return {
      direction: ED.noStateChange,
      message: 'No such elem in this stage'
    } as Effect
  } else {
    return {
      direction: ED.noStateChange,
      message: GH.descriptionOf(elem)
    } as Effect
  }
}

const getChangeStageEffect = function(command: Command, state: State) {
  const directionFrom: (command: Command) => string = R.view(L.restLens)
  const doorsInCurrenStage = DF.getDoorsForCurrentStage(state)
  const direction = directionFrom(command)

  const nextStageId = R.prop(direction as any, doorsInCurrenStage)

  const nextStage = R.find(
    R.propEq('id', nextStageId),
    R.view(L.stagesLens, state)
  ) as Stage

  const nextStageName = GH.nameOf(nextStage)

  if (R.isNil(nextStageId)) {
    return {
      direction: ED.noStateChange,
      message: 'Oopps. Something wrong. You can not go this direction.'
    } as Effect
  } else {
    return {
      direction: ED.changeNextStageId,
      nextStageId: nextStageId,
      message: `You are in  ${nextStageName}`
    } as NextStageEffect
  }
}

const getTakenElemEffect = function(command: Command, state: State) {
  const getElemEqualsTo = CF.getElemEqualsToCommand
  const FromElemsOnCurrentStage = SF.getElemsForCurrentStage(state)

  const takenElem = getElemEqualsTo(command)(FromElemsOnCurrentStage)
  const isPlace = PF.isPlaceInPocket(state)

  switch (true) {
    case !isPlace: {
      return {
        direction: ED.noStateChange,
        message: 'No place in pocket'
      } as Effect
    }
    case isPlace && !R.isNil(takenElem):
      return {
        direction: ED.takeElem,
        elem: takenElem,
        message: `${GH.nameOf(takenElem as Elem)} is taken`
      } as ElemEffect
    case isPlace && R.isNil(takenElem):
      return {
        direction: ED.noStateChange,
        message: 'No such elem in this stage'
      } as Effect
  }
}

const getPutElemEffect = function(command: Command, state: State) {
  const getElemEqualsTo = CF.getElemEqualsToCommand
  const fromPocket = PF.getPocket(state)

  const elemFromPocket = getElemEqualsTo(command)(fromPocket)

  if (R.isNil(elemFromPocket)) {
    return {
      direction: ED.noStateChange,
      message: 'No such elem in pocket'
    } as Effect
  } else {
    return {
      direction: ED.putElem,
      elem: elemFromPocket,
      message: `${GH.nameOf(elemFromPocket)} is now put to the ground.`
    } as ElemEffect
  }
}

const getPocketEffect = function(command: Command, state: State) {
  const getElemsNamesFrom = R.map(R.prop('name'))
  const pocket = PF.getPocket(state)

  const elemsInPocket = getElemsNamesFrom(pocket)

  return {
    direction: ED.pocket,
    message:
      elemsInPocket.length > 0
        ? `In your pocket: ${elemsInPocket}`
        : 'You pocket is empty'
  } as Effect
}

const getUndefinedEffect = function(command: Command, state: State) {
  return {
    direction: ED.undefinedCommand,
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
