// processCommand :: Command -> State -> Result

const R = require('ramda')
const HF = require('./helperFunctions')
const DF = require('./domainFunctions')

const getLookResult = function (state) {
  const stage = HF.getCurrentStage(state)

  if (R.isNil(stage)) {
    return {
      type: 'noChange',
      message: 'Error. NO stage defined as current'
    }
  } else {
    const elemsNames = R.map((e) => e.name, HF.getElemsForCurrentStage(state))
    const description = R.prop('description', stage)
    return {
      type: 'noChange',
      message: `Description: ${description} Elems: ${elemsNames}`
    }
  }
}

const getLookAtResult = function (command, state) {
  const elem = DF.getElemEqualsToCommand(command, HF.getElemsForCurrentStage(state))

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
  const nextStageId = R.prop(R.prop('rest', command))(HF.getDoorsForCurrentStage(state))
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
  const elem = DF.getElemEqualsToCommand(command, HF.getElemsForCurrentStage(state))
  const isPlace = HF.isPlaceInPocket(state)

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
  const elem = DF.getElemEqualsToCommand(command, HF.getPocket(state))

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
  const elems = R.map((e) => e.name, HF.getPocket(state))
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
  processCommand: processCommand
}
