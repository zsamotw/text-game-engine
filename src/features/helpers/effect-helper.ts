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
import * as S from 'sanctuary'
import * as SF from '../domain/stage-functions'
import * as SMH from './string-matcher-helper'
import Actor from '../../models/actor'
import Command from '../../models/command'
import Element from '../../models/element'
import Stage from '../../models/stage'
import State from '../../models/state'
import { Maybe } from '../utils/types'
const { equals } = require('sanctuary')

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
  const effectForStage = (maybeStage: Maybe<Stage>) => {
    const getName = S.prop('name')

    const mapToNames = S.map(getName)

    const joinedNames = S.ifElse(equals([]))(() => 'No one thing here.')(
      (names: any) => `Things: ${names}.`
    )

    const elementsDescription = S.pipe([
      SF.elementsForMaybeStage,
      mapToNames,
      joinedNames
    ])

    const joinedActorsNames = R.ifElse(
      R.isEmpty,
      R.always('Nobody here'),
      (actors: string[]) => `Persons: ${actors}.`
    )

    const actorsDescription = S.pipe([
      AF.actorsForStage(actors),
      mapToNames,
      joinedActorsNames
    ])

    return {
      operation: EO.noStateChange,
      message: `${SF.descriptionOfMaybeStage(maybeStage)}
                ${elementsDescription(maybeStage)}
                ${actorsDescription(currentStageId)}` } as Effect
  }

  const overviewEffectOf = R.ifElse(
    R.isNil,
    R.always({
      operation: EO.noStateChange,
      message: 'Error. No stage defined as current. Contact with game owner.'
    } as Effect),
    effectForStage
  )

  const currentStage = SF.stageFrom(stages)(currentStageId)
  return overviewEffectOf(currentStage)
}

const getDescriptionEffect = function(
  command: Command,
  stages: Stage[],
  currentStageId: number
) {
  const getElementEqualsTo = CF.elementEqualsToCommand
  const fromElementsInCurrentStage = (stages: Stage[]) =>
    R.compose(
      SF.elementsForMaybeStage,
      SF.stageFrom(stages)
    )

  const maybeElement = getElementEqualsTo(command)(
    fromElementsInCurrentStage(stages)(currentStageId)
  )

  const effectFrom = R.ifElse(
    S.isNothing,
    R.always({
      operation: EO.noStateChange,
      message: 'No such thing in this stage'
    } as Effect),
    (maybeElement: Maybe<Element>) => {
      const element = S.maybeToNullable(maybeElement) as Element

      return {
        operation: EO.noStateChange,
        message: GH.descriptionOf(element)
      } as Effect
    }
  )

  return effectFrom(maybeElement)
}

const getChangeStageEffect = function(
  command: Command,
  stages: Stage[],
  currentStageId: number
) {
  const maybeDoorsInCurrentStage = DF.maybeDoorsForStage(stages)(currentStageId)
  const doors = S.maybeToNullable(maybeDoorsInCurrentStage)

  const directionFrom: (command: Command) => string = R.view(L.restLens)

  const maybeNextStageId = S.get(() => true)(
    directionFrom(command) as any
  )(doors)

  const effectFrom = R.ifElse(
    S.isNothing,
    R.always({
      operation: EO.noStateChange,
      message: 'Oops. Something wrong. You can not go this direction. Try: north, south, west and east'
    } as Effect),
    (maybeNextStageId: Maybe<number>) => {
      const justNextStageId = S.maybeToNullable(maybeNextStageId) as Maybe<number>
      const nextStage = R.find(R.propEq('id', S.maybeToNullable(justNextStageId)))
      const nextStageName = R.compose(
        GH.nameOf,
        nextStage
      )(stages)

      return {
        operation: EO.changeNextStageId,
        nextStageId: S.maybeToNullable(justNextStageId),
        message: `You are in  ${nextStageName}`
      } as NextStageEffect
    }
  )

  return effectFrom(maybeNextStageId)
}

const getTakenElementEffect = function(
  command: Command,
  stages: Stage[],
  currentStageId: number,
  pocket: Element[]
) {
  const getElementEqualsTo = CF.elementEqualsToCommand
  const currentStage = SF.stageFrom(stages)(currentStageId)
  const FromElementsOnCurrentStage = SF.elementsForMaybeStage(currentStage)

  const maybeTakenElement = getElementEqualsTo(command)(
    FromElementsOnCurrentStage
  )
  const isPlace = PF.isPlaceInPocket(pocket)

  switch (true) {
    case S.not(isPlace): {
      return {
        operation: EO.noStateChange,
        message: 'There is no place in pocket'
      } as Effect
    }

    case isPlace && S.isJust(maybeTakenElement):
      const element = S.maybeToNullable(maybeTakenElement)

      return {
        operation: EO.takeElement,
        element: element,
        currentStageId: currentStageId,
        message: `${GH.nameOf(element as Element)} is taken`
      } as ElementEffect

    case isPlace && S.isNothing(maybeTakenElement):
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
  const maybeElementFromPocket = CF.elementEqualsToCommand(command)(pocket)

  const effectFrom = R.ifElse(
    S.isNothing,
    R.always({
      operation: EO.noStateChange,
      message: 'No such thing in pocket'
    } as Effect),
    (maybeElementFromPocket: Maybe<Element>) => {
      const elementFromPocket = S.maybeToNullable(
        maybeElementFromPocket
      ) as Element

      return {
        operation: EO.putElement,
        element: elementFromPocket,
        currentStageId: currentStageId,
        message: `${GH.nameOf(elementFromPocket)} is now put to the ground.`
      } as ElementEffect
    }
  )

  return effectFrom(maybeElementFromPocket)
}

const getPocketEffect = function(command: Command, pocket: Element[]) {
  const getElementsNamesFrom = R.map(R.prop('name'))
  const elementsInPocket = getElementsNamesFrom(pocket)

  const messageFrom = R.ifElse(
    R.isEmpty,
    R.always('You pocket is empty'),
    elementsInPocket => `In your pocket: ${elementsInPocket}`
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
  const actorName = CF.restOfCommand(command)
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
  const isAnybodyKnowsSomething = R.compose(
    R.not,
    R.isEmpty,
    actorsKnowledge
  )

  return {
    operation: EO.undefinedCommand,
    message: noActorsOnStage(actors)
      ? 'There is no actor with that name'
      : isAnybodyKnowsSomething(actors)
      ? actorsKnowledge(actors).toString()
      : 'Actors on this stage have no knowledge'
  } as Effect
}

const getUndefinedEffect = function(command: Command, state: State) {
  return {
    operation: EO.undefinedCommand,
    message: 'oops!! it is wrong command.'
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
