const R = require('ramda')
const SF = require('../domain/stagesFunctions')
const PF = require('../domain/pocketFunctions')
const CF = require('../domain/commandFunctions')
const DF = require('../domain/doorFunctions')
const AF = require('../domain/actorsFunctions')
const GH = require('../helpers/genericHelper')
const L = require('../utils/lenses')
const RT = require('../utils/resultTypes')

const getOverviewResult = function (state) {
  const stage = SF.getCurrentStage(state)

  if (R.isNil(stage)) {
    return {
      type: RT.noStateChange,
      message: 'Error. No stage defined as current. Contact with game owner.'
    }
  } else {
    const elemsNamesForCurrentStage = R.map(R.pluck('name'), SF.getElemsForCurrentStage)
    const actorNamesForCurrentStage = R.map(R.pluck('name'), AF.getActorsForCurrentStage)
    const elemsOnSTage = elemsNamesForCurrentStage(state).length > 0
      ? `Things: ${elemsNamesForCurrentStage(state)}`
      : 'No one thing here'
    const actorsOnSTage = actorNamesForCurrentStage(state).length > 0
      ? `Persons: ${actorNamesForCurrentStage(state)}`
      : 'Nobody here'

    return {
      type: RT.noStateChange,
      message: `${GH.descriptionOf(stage)}
                ${elemsOnSTage}
                ${actorsOnSTage}`
    }
  }
}

const getDescriptionResult = function (command, state) {
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

const getChangeStageResult = function (command, state) {
  const directionFrom = R.view(L.restLens)
  const get = R.prop
  const andFindDoorsInCurrenStage = DF.getDoorsForCurrentStage

  const nextStageId = get(directionFrom(command))(andFindDoorsInCurrenStage(state))
  const nextStage =
    R.find(
      R.propEq('id', nextStageId),
      R.view(L.stagesLens, state))

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

const getTakenElemResult = function (command, state) {
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
        message: `${GH.nameOf(takenElem)} is taken`
      }
    case isPlace && R.isNil(takenElem):
      return {
        type: RT.noStateChange,
        message: 'No such elem in this stage'
      }
  }
}

const getPutElemResult = function (command, state) {
  const getElemEqualsTo = CF.getElemEqualsToCommand
  const fromPocket = PF.getPocket(state)

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

const getPocketResult = function (command, state) {
  const getElemsFrom = R.map(R.pluck('name'))
  const pocket = PF.getPocket(state)

  const elemsInPocket = getElemsFrom(pocket)

  return {
    type: RT.pocket,
    elems: elemsInPocket,
    message: elemsInPocket.length > 0 ? `In your pocket: ${elemsInPocket}` : 'You pocket is empty'
  }
}

const getUndefinedResult = function (command, state) {
  return {
    type: RT.undefinedCommand,
    message: `ooops!! it is wrong command.`
  }
}

module.exports = {
  getOverviewResult,
  getDescriptionResult,
  getChangeStageResult,
  getTakenElemResult,
  getPutElemResult,
  getPocketResult,
  getUndefinedResult
}
