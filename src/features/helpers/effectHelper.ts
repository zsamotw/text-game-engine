import * as R from 'ramda'
import * as SF from '../domain/stageFunctions'
import * as PF from '../domain/pocketFunctions'
import * as CF from '../domain/commandFunctions'
import * as DF from '../domain/doorFunctions'
import * as AF from '../domain/actorFunctions'
import * as L from '../utils/lenses'
import * as RT from '../utils/effectDirections'
import * as GH from './genericHelper'
import Command from '../../models/command'
import State from '../../models/state'
import Elem from '../../models/elem'
import Stage from '../../models/stage'

const getOverviewEffect = function(state: State) {
  const stage = SF.getCurrentStage(state)

  if (R.isNil(stage)) {
    return {
      type: RT.noStateChange,
      message: 'Error. No stage defined as current. Contact with game owner.'
    }
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
      type: RT.noStateChange,
      message: `${GH.descriptionOf(stage)}
                ${elemsOnSTage}
                ${actorsOnSTage}`
    }
  }
}

const getDescriptionEffect = function(command: Command, state: State) {
  const getElemEqualsTo = CF.getElemEqualsToCommand
  const fromCurrentStage = SF.getElemsForCurrentStage(state)

  const elem = getElemEqualsTo(command)(fromCurrentStage)

  if (R.isNil(elem)) {
    return {
      type: RT.noStateChange,
      message: 'No such elem in this stage'
    }
  } else {
    return {
      type: RT.noStateChange,
      message: GH.descriptionOf(elem)
    }
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
      type: RT.noStateChange,
      message: 'Oopps. Something wrong. You can not go this direction.'
    }
  } else {
    return {
      type: RT.changeNextStageId,
      nextStageId: nextStageId,
      message: `You are in  ${nextStageName}`
    }
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
        type: RT.noStateChange,
        message: 'No place in pocket'
      }
    }
    case isPlace && !R.isNil(takenElem):
      return {
        type: RT.takeElem,
        elem: takenElem,
        message: `${GH.nameOf(takenElem as Elem)} is taken`
      }
    case isPlace && R.isNil(takenElem):
      return {
        type: RT.noStateChange,
        message: 'No such elem in this stage'
      }
  }
}

const getPutElemEffect = function(command: Command, state: State) {
  const getElemEqualsTo = CF.getElemEqualsToCommand
  const fromPocket = PF.viewPocket(state)

  const elemFromPocket = getElemEqualsTo(command)(fromPocket)

  if (R.isNil(elemFromPocket)) {
    return {
      type: RT.noStateChange,
      message: 'No such elem in pocket'
    }
  } else {
    return {
      type: RT.putElem,
      elem: elemFromPocket,
      message: `${GH.nameOf(elemFromPocket)} is now put to the ground.`
    }
  }
}

const getPocketEffect = function(command: Command, state: State) {
  const getElemsFrom = R.map(R.prop('name'))
  const pocket = PF.viewPocket(state)

  const elemsInPocket = getElemsFrom(pocket)

  return {
    type: RT.pocket,
    elems: elemsInPocket,
    message:
      elemsInPocket.length > 0
        ? `In your pocket: ${elemsInPocket}`
        : 'You pocket is empty'
  }
}

const getUndefinedEffect = function(command: Command, state: State) {
  return {
    type: RT.undefinedCommand,
    message: `ooops!! it is wrong command.`
  }
}

export {
  getOverviewEffect,
  getDescriptionEffect,
  getChangeStageEffect,
  getTakenElemEffect,
  getPutElemEffect,
  getPocketEffect,
  getUndefinedEffect
}
