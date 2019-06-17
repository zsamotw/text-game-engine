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
    const elemsNames = SF.getElemsForCurrentStage(state).map(e => R.prop('name', e))
    const actorNames = AF.getActorsForCurrentStage(state).map(a => R.prop('name', a))
    const description = R.view(L.descriptionLens, stage)
    return {
      type: 'noChange',
      message: `${description} Elems: ${elemsNames} Actors: ${actorNames}`
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
      message: R.view(L.elemDescription, elem)
    }
  }
}

const getGoResult = function (command, state) {
  const nextStageId = R.prop(R.prop('rest', command))(DF.getDoorsForCurrentStage(state))
  const nextStage = R.find(R.propEq('id', nextStageId), R.prop('stages', state))

  if (R.isNil(nextStageId)) {
    return {
      type: 'noChange',
      message: 'Oopps. Something wrong. You can not go this direction.'
    }
  } else {
    return {
      type: 'changeNextStageId',
      nextStageId: nextStageId,
      message: `You are in  ${R.prop('name', nextStage)}`
    }
  }
}

const getTakeResult = function (command, state) {
  const elem = CF.getElemEqualsToCommand(command, SF.getElemsForCurrentStage(state))
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
  const elems = R.map((e) => e.name, PF.getPocket(state))
  return {
    type: 'pocket',
    elems: elems,
    message: `In your pocket: ${elems}`
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
