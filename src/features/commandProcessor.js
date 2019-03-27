// processCommand :: Command -> State -> (State, message)

const R = require('ramda')

const {
  stateCurrentStageIdLens
} = require('./lenses')

const {
  getElemsForCurrentStage,
  getDoorsForCurrentStage,
  restCommandEq: restCommandEqName
} = require('./helperFunctions')

const getLookResult = function (state) {
  const stage = R.find(
    R.propEq('id', R.prop('currentStageId', state)))(R.prop('stages', state))

  if (R.isNil(stage)) return {
    state: state,
    message: 'Error. NO stage defined as current'
  }
  else return {
    state: state,
    message: R.prop('description', stage)
  }
}

const getLookAtResult = function (command, state) {
  const elems = getElemsForCurrentStage(state)
  const elem = R.find(restCommandEqName(command), elems)

  if (R.isNil(elem)) return {
    state: state,
    message: 'No such elem in this stage'
  }
  else return {
    state: state,
    message: R.prop('description', elem)
  }
}

const getGoResult = function (command, state) {
  const doors = getDoorsForCurrentStage(state)
  const nextStageId = R.prop(R.prop('rest', command))(doors)
  const nextStage = R.find(R.propEq('id', nextStageId), R.prop('stages', state))

  if (R.isNil(nextStageId)) {
    return {
      state: state,
      message: 'You can not go this direction'
    }
  } else {
    return {
      state: R.set(stateCurrentStageIdLens, nextStageId, state),
      message: `You are in next stage: ${R.prop('name', nextStage)}`
    }
  }
}

const getUndefinedResult = function (command, state) {
  return {
    state: state,
    message: 'ooops wrong command'
  }
}

const processCommand = R.cond([
  [(command, state) => R.equals(R.prop('order', command), 'Look'), (command, state) => getLookResult(state)],
  [(command, state) => R.equals(R.prop('order', command), 'LookAt'), (command, state) => getLookAtResult(command, state)],
  [(command, state) => R.equals(R.prop('order', command), 'Go'), (command, state) => getGoResult(command, state)],
  [(command, state) => R.equals(R.prop('order', command), 'Undefined'), (command, state) => getUndefinedResult(command, state)],
  [R.T, (state, command) => 'Errorrrr!!!']
])

module.exports = {
  processCommand
}

/// ///////////////
// test in node =>
/// //////////////

const {
  state
} = require('../db/state.js')
const res1 = processCommand({
  order: 'Look',
  rest: ''
}, state)
console.log(res1)
