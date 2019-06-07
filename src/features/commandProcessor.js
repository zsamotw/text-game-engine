// processCommand :: Command -> State -> Result

const R = require('ramda')
const SF = require('./stateFunctions')
const DF = require('./domainFunctions')

const getLookResult = function (state) {
  const stage = SF.getCurrentStage(state)

  if (R.isNil(stage)) {
    return {
      type: 'noChange',
      message: 'Error. No stage defined as current. Contact with game owner.'
    }
  } else {
    const elemsNames = SF.getElemsForCurrentStage(state).map(e => R.prop('name', e))
    const actorNames = SF.getActorsForCurrentStage(state).map(a => R.prop('name', a))
    const description = R.prop('description', stage)
    return {
      type: 'noChange',
      message: `${description} Elems: ${elemsNames} Actors: ${actorNames}`
    }
  }
}

const getLookAtResult = function (command, state) {
  const elem = DF.getElemEqualsToCommand(command, SF.getElemsForCurrentStage(state))

  if (R.isNil(elem)) {
    return {
      type: 'noChange',
      message: 'No such elem in this stage'
    }
  } else {
    return {
      type: 'noChange',
      message: R.prop('description', elem)
    }
  }
}

const getGoResult = function (command, state) {
  const nextStageId = R.prop(R.prop('rest', command))(SF.getDoorsForCurrentStage(state))
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
  const elem = DF.getElemEqualsToCommand(command, SF.getElemsForCurrentStage(state))
  const isPlace = SF.isPlaceInPocket(state)

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
  const elem = DF.getElemEqualsToCommand(command, SF.getPocket(state))

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
  const elems = R.map((e) => e.name, SF.getPocket(state))
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

const processCommand = R.cond([
  [(command, state) => R.equals(R.prop('order', command), 'Look'), (command, state) => getLookResult(state)],
  [(command, state) => R.equals(R.prop('order', command), 'LookAt'), (command, state) => getLookAtResult(command, state)],
  [(command, state) => R.equals(R.prop('order', command), 'Go'), (command, state) => getGoResult(command, state)],
  [(command, state) => R.equals(R.prop('order', command), 'Take'), (command, state) => getTakeResult(command, state)],
  [(command, state) => R.equals(R.prop('order', command), 'Put'), (command, state) => getPutResult(command, state)],
  [(command, state) => R.equals(R.prop('order', command), 'Pocket'), (command, state) => getPocketResult(command, state)],
  [(command, state) => R.equals(R.prop('order', command), 'Undefined'), (command, state) => getUndefinedResult(command, state)],
  [R.T, (state, command) => 'Errorrrr!!!']
])

module.exports = {
  processCommand
}
