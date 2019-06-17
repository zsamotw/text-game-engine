const R = require('ramda')
const SF = require('../domain/stagesFunctions')
const PF = require('../domain/pocketFunctions')
const CF = require('../domain/commandFunctions')
const DF = require('../domain/doorFunctions')
const AF = require('../domain/actorsFunctions')
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
    const descriptionOf = R.view(L.descriptionLens)
    return {
      type: 'noChange',
      message: `${descriptionOf(stage)}
                Elems: ${elemsNamesForCurrentStage(state)}
                Actors: ${actorNamesForCurrentStage(state)}`
    }
  }
}

const getLookAtResult = function (command, state) {
  const elem = CF.getElemEqualsToCommand(command, SF.getElemsForCurrentStage(state))
  const descriptionOf = R.view(L.descriptionLens)

  if (R.isNil(elem)) {
    return {
      type: 'noChange',
      message: 'No such elem in this stage'
    }
  } else {
    return {
      type: 'noChange',
      message: descriptionOf(elem)
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

  const nextStageName = R.compose(R.view(L.nameLens, nextStage))

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
  const getElemsEqualsTo = CF.getElemEqualsToCommand
  const FromCurrentStage = SF.getElemsForCurrentStage(state)

  const elem = getElemsEqualsTo(command)(FromCurrentStage)
  const isPlace = PF.isPlaceInPocket(state)

  switch (true) {
    case !isPlace: {
      return {
        type: 'noChange',
        message: 'No place in pocket'
      }
    }
    case isPlace && !R.isNil(elem):
      return {
        type: 'addElemToPocket',
        elem: elem
      }
    case isPlace && R.isNil(elem):
      return {
        type: 'noChange',
        message: 'No such elem in this stage'
      }
  }
}

const getPutResult = function (command, state) {
  const elem = CF.getElemEqualsToCommand(command, PF.getPocket(state))

  if (R.isNil(elem)) {
    return {
      type: 'noChange',
      message: 'No such elem in pocket'
    }
  } else {
    return {
      type: 'putElemToStage',
      elem: elem
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
