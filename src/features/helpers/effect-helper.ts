import { Effect, NextStageEffect, ElementEffect } from '../../models/effect'
import * as AF from '../domain/actor-functions'
import * as CF from '../domain/command-functions'
import * as CP from '../processors/commands-processor'
import * as DF from '../domain/door-functions'
import * as EO from '../utils/effect-operations'
import * as GH from '../domain/general-usage-functions'
import * as L from '../utils/lenses'
import * as PF from '../domain/pocket-functions'
import * as R from 'ramda'
import * as SF from '../domain/stage-functions'
import * as SMH from './string-matcher-helper'
import Actor from '../../models/actor'
import Command from '../../models/command'
import Element from '../../models/element'
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

    const elementsNamesForCurrentStage = R.map(
      getName,
      SF.getElementsForStage(currentStage)
    )

    const actorNamesForCurrentStage: string[] = R.map(
      getName,
      AF.getActorsForStage(actors, currentStageId)
    )

    const elementsOnStage =
      elementsNamesForCurrentStage.length > 0
        ? `Things: ${elementsNamesForCurrentStage}.`
        : 'No one thing here.'
    const actorsOnStage =
      actorNamesForCurrentStage.length > 0
        ? `Persons: ${actorNamesForCurrentStage}.`
        : 'Nobody here.'

    const res = {
      operation: EO.noStateChange,
      message: `${GH.descriptionOf(currentStage)}
                ${elementsOnStage}
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
  const getElementEqualsTo = CF.getElementEqualsToCommand
  const fromElementsInCurrentStage = R.compose(
    SF.getElementsForStage,
    SF.getStage
  )

  const element = getElementEqualsTo(command)(
    fromElementsInCurrentStage(stages, currentStageId)
  )

  if (R.isNil(element)) {
    return {
      operation: EO.noStateChange,
      message: 'No such thing in this stage'
    } as Effect
  } else {
    return {
      operation: EO.noStateChange,
      message: GH.descriptionOf(element)
    } as Effect
  }
}

const getChangeStageEffect = function(
  command: Command,
  stages: Stage[],
  currentStageId: number
) {
  const directionFrom: (command: Command) => string = R.view(L.restLens)
  const doorsInCurrentStage = DF.getDoorsForStage(stages, currentStageId)
  const direction = directionFrom(command)

  const nextStageId = R.prop(direction as any, doorsInCurrentStage)

  const nextStage = R.find(R.propEq('id', nextStageId), stages) as Stage

  const nextStageName = GH.nameOf(nextStage)

  if (R.isNil(nextStageId)) {
    return {
      operation: EO.noStateChange,
      message: 'Oops. Something wrong. You can not go this operation.'
    } as Effect
  } else {
    return {
      operation: EO.changeNextStageId,
      nextStageId: nextStageId,
      message: `You are in  ${nextStageName}`
    } as NextStageEffect
  }
}

const getTakenElementEffect = function(
  command: Command,
  stages: Stage[],
  currentStageId: number,
  pocket: Element[]
) {
  const getElementEqualsTo = CF.getElementEqualsToCommand
  const currentStage = SF.getStage(stages, currentStageId)
  const FromElementsOnCurrentStage = SF.getElementsForStage(currentStage)

  const takenElement = getElementEqualsTo(command)(FromElementsOnCurrentStage)
  const isPlace = PF.isPlaceInPocket(pocket)

  switch (true) {
    case !isPlace: {
      return {
        operation: EO.noStateChange,
        message: 'No place in pocket'
      } as Effect
    }
    case isPlace && !R.isNil(takenElement):
      return {
        operation: EO.takeElement,
        element: takenElement,
        currentStageId: currentStageId,
        message: `${GH.nameOf(takenElement as Element)} is taken`
      } as ElementEffect
    case isPlace && R.isNil(takenElement):
      return {
        operation: EO.noStateChange,
        message: 'No such thing in this stage'
      } as Effect
  }
}

const getPutElementEffect = function(
  command: Command,
  currentStageId: number,
  pocket: Element[]
) {
  const getElementEqualsTo = CF.getElementEqualsToCommand

  const elementFromPocket = getElementEqualsTo(command)(pocket)

  if (R.isNil(elementFromPocket)) {
    return {
      operation: EO.noStateChange,
      message: 'No such thing in pocket'
    } as Effect
  } else {
    return {
      operation: EO.putElement,
      element: elementFromPocket,
      currentStageId: currentStageId,
      message: `${GH.nameOf(elementFromPocket)} is now put to the ground.`
    } as ElementEffect
  }
}

const getPocketEffect = function(command: Command, pocket: Element[]) {
  const getElementsNamesFrom = R.map(R.prop('name'))
  const elementsInPocket = getElementsNamesFrom(pocket)

  return {
    operation: EO.noStateChange,
    message:
      elementsInPocket.length > 0
        ? `In your pocket: ${elementsInPocket}`
        : 'You pocket is empty'
  } as Effect
}

const getTalkEffect = function(
  command: Command,
  stageId: number,
  actors: Actor[]
) {
  const actorName = CF.getRestOfCommand(command)
  const actorsOnStage = R.filter(
    R.whereEq({ stageId: stageId, name: actorName })
  ) as (actors: Actor[]) => Actor[]
  const actorsKnowledge = R.compose(
    R.map((a: Actor) => a.knowledge),
    actorsOnStage
  )
  const noActorsOnStage = R.compose(
    R.isEmpty,
    actorsOnStage
  )
  const isAnybodyHowKnowsSomething = R.compose(
    R.not,
    R.isEmpty,
    actorsKnowledge
  )

  return {
    operation: EO.undefinedCommand,
    message: noActorsOnStage(actors)
      ? 'There is no actor with that name'
      : isAnybodyHowKnowsSomething(actors)
      ? actorsKnowledge(actors).toString()
      : 'Actors on this stage have no knowledge'
  } as Effect
}

const getUndefinedEffect = function(command: Command, state: State) {
  return {
    operation: EO.undefinedCommand,
    message: `oops!! it is wrong command.`
  } as Effect
}

export {
  getEffect,
  getOverviewEffect,
  getDescriptionEffect,
  getChangeStageEffect,
  getTakenElementEffect,
  getPutElementEffect,
  getPocketEffect,
  getTalkEffect,
  getUndefinedEffect
}
