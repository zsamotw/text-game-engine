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

  const effectForStage = (stage: Stage) => {
    const getName = R.prop('name')

    const elementsNamesForCurrentStage = R.map(
      getName,
      SF.getElementsForStage(stage)
    )

    const actorNamesForCurrentStage = R.map(
      getName,
      AF.getActorsForStage(actors, currentStageId)
    )

    const elementsDescription = R.ifElse(
      R.isEmpty,
      R.always('No one thing here.'),
      (elements: string) => `Things: ${elements}.`
    )

    const actorsDescription = R.ifElse(
      R.isEmpty,
      R.always('Nobody here'),
      (actors: string[]) => `Persons: ${actors}.`
    )

    return {
      operation: EO.noStateChange,
      message: `${GH.descriptionOf(stage)}
                ${elementsDescription(elementsNamesForCurrentStage)}
                ${actorsDescription(actorNamesForCurrentStage)}`
    } as Effect
  }

  const effectFrom = R.ifElse(
    R.isNil,
    R.always({
      operation: EO.noStateChange,
      message: 'Error. No stage defined as current. Contact with game owner.'
    } as Effect),
    effectForStage
  )

  return effectFrom(currentStage)
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

  const effectFrom = R.ifElse(
    R.isNil,
    R.always({
      operation: EO.noStateChange,
      message: 'No such thing in this stage'
    } as Effect),
    (element: Element) => {
      return {
        operation: EO.noStateChange,
        message: GH.descriptionOf(element)
      } as Effect
    }
  )

  return effectFrom(element)
}

const getChangeStageEffect = function(
  command: Command,
  stages: Stage[],
  currentStageId: number
) {
  const doorsInCurrentStage = DF.getDoorsForStage(stages, currentStageId)

  const directionFrom: (command: Command) => string = R.view(L.restLens)

  const nextStageId = R.prop(directionFrom(command) as any, doorsInCurrentStage)
  const nextStage = R.find(R.propEq('id', nextStageId))

  const nextStageName = R.compose(
    GH.nameOf,
    nextStage
  )(stages)

  const effectFrom = R.ifElse(
    R.isNil,
    R.always({
      operation: EO.noStateChange,
      message: 'Oops. Something wrong. You can not go this operation.'
    } as Effect),
    (nextStageId: number) => {
      return {
        operation: EO.changeNextStageId,
        nextStageId: nextStageId,
        message: `You are in  ${nextStageName}`
      } as NextStageEffect
    }
  )

  return effectFrom(nextStageId)
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
  //TODO use cond, and, not
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

  const effectFrom = R.ifElse(
    R.isNil,
    R.always({
      operation: EO.noStateChange,
      message: 'No such thing in pocket'
    } as Effect),
    elementFromPocket => {
      return {
        operation: EO.putElement,
        element: elementFromPocket,
        currentStageId: currentStageId,
        message: `${GH.nameOf(elementFromPocket)} is now put to the ground.`
      } as ElementEffect
    }
  )

  return effectFrom(elementFromPocket)
}

const getPocketEffect = function(command: Command, pocket: Element[]) {
  const getElementsNamesFrom = R.map(R.prop('name'))
  const elementsInPocket = getElementsNamesFrom(pocket)

  const messageFrom = R.ifElse(
    R.isEmpty,
    R.always('You pocket is empty'),
    (elementsInPocket) => `In your pocket: ${elementsInPocket}`
  )

  return {
    operation: EO.noStateChange,
    message: messageFrom(elementsInPocket)
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
