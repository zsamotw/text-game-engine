// processCommand :: Command -> State -> (State, message)

const R = require('ramda')

const {
  getCurrentStage,
  getDoorsForCurrentStage,
  getElemsForCurrentStage,
  getPocket
} = require('./helperFunctions')

const {
  getElemEqualsToCommand
} = require('./domainFunctions')

const getLookResult = function (state) {
  const stage = getCurrentStage(state)

  if (R.isNil(stage)) {
    return {
      type: 'noChange',
      message: 'Error. NO stage defined as current'
    }
  } else {
    const elemsNames = R.map((e) => e.name, getElemsForCurrentStage(state))
    const description = R.prop('description', stage)
    return {
      type: 'noChange',
      message: `Description: ${description} Elems: ${elemsNames}`
    }
  }
}

const getLookAtResult = function (command, state) {
  const elem = getElemEqualsToCommand(command, getElemsForCurrentStage(state))

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
  const nextStageId = R.prop(R.prop('rest', command))(getDoorsForCurrentStage(state))
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
      message: `You are in next stage: ${R.prop('name', nextStage)}`
    }
  }
}

const getTakeResult = function (command, state) {
  const elem = getElemEqualsToCommand(command, getElemsForCurrentStage(state))

  if (R.isNil(elem)) {
    return {
      type: 'noChange',
      message: 'No such elem in this stage'
    }
  } else {
    return {
      type: 'addElemToPocket',
      elem: elem
    }
  }
}

const getPutResult = function (command, state) {
  const elem = getElemEqualsToCommand(command, getPocket(state))

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
  const elems = R.map((e) => e.name, getPocket(state))
  return {
    type: 'pocket',
    elems: elems,
    message: `In your pocket: ${elems}`
  }
}

const getUndefinedResult = function (command, state) {
  return {
    type: 'undefinedCommand',
    message: `ooops!! ${command} is wrong`
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
  processCommand: processCommand
}
