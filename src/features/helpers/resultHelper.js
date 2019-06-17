const R = require('ramda')
const SF = require('../domain/stagesFunctions')
const PF = require('../domain/pocketFunctions')
const CF = require('../domain/commandFunctions')
const DF = require('../domain/doorFunctions')
const AF = require('../domain/actorsFunctions')
const GH = require('../helpers/genericHelper')
const L = require('../elements/lenses')

const getLookResult = function (state) {
  const stage = SF.getCurrentStage(state)

  if (R.isNil(stage)) {
    return {
      type: 'noChange',
      message: 'Error. No stage defined as current. Contact with game owner.'
    }
  } else {
    const elemsNamesForCurrentStage = R.map(R.pluck('name'), SF.getElemsForCurrentStage)
    const actorNamesForCurrentStage = R.map(R.pluck('name'), AF.getActorsForCurrentStage)

    return {
      type: 'noChange',
      message: `${GH.descriptionOf(stage)}
                Elems: ${elemsNamesForCurrentStage(state)}
                Actors: ${actorNamesForCurrentStage(state)}`
    }
  }
}

const getLookAtResult = function (command, state) {
  const elem = CF.getElemEqualsToCommand(command, SF.getElemsForCurrentStage(state))

  if (R.isNil(elem)) {
    return {
      type: 'noChange',
      message: 'No such elem in this stage'
    }
  } else {
    return {
      type: 'noChange',
      message: GH.descriptionOf(elem)
    }
  }
}

const getGoResult = function (command, state) {
  const directionFrom = R.view(L.restLens)
  const get = R.prop
  const andFindDoorsInCurrenStage = DF.getDoorsForCurrentStage

  const nextStageId = get(directionFrom(command))(andFindDoorsInCurrenStage(state))
  const nextStage =
    R.find(
      R.propEq('id', nextStageId),
      R.view(L.stagesLens))

  const nextStageName = R.compose(GH.nameOf, nextStage)

  if (R.isNil(nextStageId)) {
    return {
      type: 'noChange',
      message: 'Oopps. Something wrong. You can not go this direction.'
    }
  } else {
    return {
      type: 'changeNextStageId',
      nextStageId: nextStageId,
      message: `You are in  ${nextStageName(state)}`
    }
  }
}

const getTakeResult = function (command, state) {
  const getElemEqualsTo = CF.getElemEqualsToCommand
  const FromCurrentStageElems = SF.getElemsForCurrentStage(state)

  const takenElem = getElemEqualsTo(command)(FromCurrentStageElems)
  const isPlace = PF.isPlaceInPocket(state)

  switch (true) {
    case !isPlace: {
      return {
        type: 'noChange',
        message: 'No place in pocket'
      }
    }
    case isPlace && !R.isNil(takenElem):
      return {
        type: 'addElemToPocket',
        elem: takenElem,
        message: `${GH.nameOf(takenElem)} is taken`
      }
    case isPlace && R.isNil(takenElem):
      return {
        type: 'noChange',
        message: 'No such elem in this stage'
      }
  }
}

const getPutResult = function (command, state) {
  const getElemEqualsTo = CF.getElemEqualsToCommand
  const fromPocket = PF.getPocket(state)

  const elemFromPocket = getElemEqualsTo(command)(fromPocket)

  if (R.isNil(elemFromPocket)) {
    return {
      type: 'noChange',
      message: 'No such elem in pocket'
    }
  } else {
    return {
      type: 'putElemToStage',
      elem: elemFromPocket,
      message: `${GH.nameOf(elemFromPocket)} is now put to the ground.`
    }
  }
}

const getPocketResult = function (command, state) {
  const getElemsFrom = R.map(R.pluck('name'))
  const elemsInPocket = getElemsFrom(PF.getPocket(state))

  return {
    type: 'pocket',
    elems: elemsInPocket,
    message: elemsInPocket.length > 0 ? `In your pocket: ${elemsInPocket}` : 'You pocket is empty'
  }
}

const getUndefinedResult = function (command, state) {
  return {
    type: 'undefinedCommand',
    message: `ooops!! it is wrong command.`
  }
}

module.exports = {
  getLookResult,
  getLookAtResult,
  getGoResult,
  getTakeResult,
  getPutResult,
  getPocketResult,
  getUndefinedResult
}
