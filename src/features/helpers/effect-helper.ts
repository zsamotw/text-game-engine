import { Effect, NextStageEffect, ElementEffect } from '../../models/effect'
import { Maybe } from '../utils/types'
import * as AF from '../domain/actor-functions'
import * as CF from '../domain/command-functions'
import * as CP from '../processors/commands-processor'
import * as DF from '../domain/door-functions'
import * as EO from '../utils/effect-operations'
import * as GH from '../domain/general-usage-functions'
import * as L from '../utils/lenses'
import * as PF from '../domain/pocket-functions'
import * as S from 'sanctuary'
import * as SF from '../domain/stage-functions'
import * as SMH from './string-matcher-helper'
import Actor from '../../models/actor'
import Command from '../../models/command'
import Element from '../../models/element'
import Stage from '../../models/stage'
import State from '../../models/state'
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
      names => `Things: ${names}.`
    )

    const elementsDescription = S.pipe([
      SF.elementsForMaybeStage,
      mapToNames,
      joinedNames
    ])

    const joinedActorsNames = S.ifElse(S.equals([])) (() => 'Nobody here')(
      actors => `Persons: ${actors}.`
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
                ${actorsDescription(currentStageId)}`
    } as Effect
  }

  const overviewEffectOf = S.ifElse(S.isNothing)(() => {
    return {
      operation: EO.noStateChange,
      message: 'Error. No stage defined as current. Contact with game owner.'
    } as Effect
  })(effectForStage)

  const maybeCurrentStage = SF.maybeStage(stages)(currentStageId)
  return overviewEffectOf(maybeCurrentStage)
}

const getDescriptionEffect = function(
  command: Command,
  stages: Stage[],
  currentStageId: number
) {
  const getElementEqualsTo = CF.elementEqualsToCommand
  const fromElementsInCurrentStage = (stages: Stage[]) =>
    S.compose(SF.elementsForMaybeStage)(SF.maybeStage(stages))

  const maybeElement = getElementEqualsTo(command)(
    fromElementsInCurrentStage(stages)(currentStageId)
  )

  const descriptionEffectFrom = S.ifElse(S.isNothing)(() => {
    return {
      operation: EO.noStateChange,
      message: 'No such thing in this stage'
    } as Effect
  })(maybeElement => {
    const element = S.maybeToNullable(maybeElement) as Element
    return {
      operation: EO.noStateChange,
      message: GH.descriptionOf(element)
    } as Effect
  })

  return descriptionEffectFrom(maybeElement)
}

const getChangeStageEffect = function(
  command: Command,
  stages: Stage[],
  currentStageId: number
) {
  const maybeDoorsInCurrentStage = DF.maybeDoorsForStage(stages)(currentStageId)
  const doors = S.maybeToNullable(maybeDoorsInCurrentStage)

  const directionFrom: (command: Command) => string = L.commandRestLens.get()

  const maybeNextStageId = S.get(() => true)(directionFrom(command) as any)(
    doors
  )

  const changeStageEffectFrom = S.ifElse(S.isNothing)(() => {
    return {
      operation: EO.noStateChange,
      message:
        'Oops. Something wrong. You can not go this direction. Try: north, south, west and east'
    } as Effect
  })(maybeOfMaybeNextStageId => {
    const maybeNextStageId = S.join(maybeOfMaybeNextStageId)
    const maybeNextStage = S.chain((id: number) => SF.maybeStage(stages)(id))(
      maybeNextStageId
    )

    const openDoorOrStay = S.ifElse(S.isJust)(() => {
      const name = SF.nameOfMaybeStage(maybeNextStage as Maybe<Stage>)
      return {
        operation: EO.changeNextStageId,
        nextStageId: S.maybeToNullable(maybeNextStageId),
        message: `You are in  ${name}`
      } as NextStageEffect
    })(() => {
      return {
        operation: EO.noStateChange,
        message: `There are no way from this stage in ${directionFrom(
          command
        )} direction`
      } as NextStageEffect
    })

    return openDoorOrStay(maybeNextStage as Maybe<Stage>)
  })

  return changeStageEffectFrom(maybeNextStageId)
}

const getTakenElementEffect = function(
  command: Command,
  stages: Stage[],
  currentStageId: number,
  pocket: Element[]
) {
  const getElementEqualsTo = CF.elementEqualsToCommand
  const currentStage = SF.maybeStage(stages)(currentStageId)
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

  const putEffectFrom = S.ifElse(S.isNothing)(() => {
    return {
      operation: EO.noStateChange,
      message: 'No such thing in pocket'
    } as Effect
  })(maybeElementFromPocket => {
    const elementFromPocket = S.maybeToNullable(
      maybeElementFromPocket
    ) as Element

    return {
      operation: EO.putElement,
      element: elementFromPocket,
      currentStageId: currentStageId,
      message: `${GH.nameOf(elementFromPocket)} is now put to the ground.`
    } as ElementEffect
  })

  return putEffectFrom(maybeElementFromPocket)
}

const getPocketEffect = function(command: Command, pocket: Element[]) {
  const getElementsNamesFrom = S.map(S.prop('name'))
  const elementsInPocket = getElementsNamesFrom(pocket)

  const messageFrom = S.ifElse(S.equals([]))(() => 'You pocket is empty')(
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
  const stageIdEqualsTo = S.equals(stageId)
  const nameEqualsTo = S.equals(actorName)
  const actorsOnStage = S.filter((actor: Actor) =>
    S.and(nameEqualsTo(AF.nameOf(actor)))(stageIdEqualsTo(AF.stageIdOf(actor)))
  )
  const actorsKnowledge = S.compose(S.map((a: Actor) => a.knowledge))(
    actorsOnStage
  )
  const noActorsOnStage = S.compose(S.equals([]))(actorsOnStage)
  const isAnybodyKnowsSomething = S.pipe([actorsKnowledge, S.equals([]), S.not])

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
