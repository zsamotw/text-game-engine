const R = require('ramda')

const getStages = (state) => {
  return R.prop('stages', state)
}

const getPocket = (state) => {
  return R.prop('pocket', state)
}

const getCurrentStage = (state) => {
  return R.find(R.propEq('id', R.prop('currentStageId', state)), R.prop('stages', state))
}

const getElemsForStage = (stage) => {
  return R.prop('elems', stage)
}

const getDoorsForStage = (stage) => {
  return R.prop('doors', stage)
}
const getRestOfCommand = (command) => {
  return R.prop('rest', command)
}

const nameEq = (name) => {
  return R.propEq('name', name)
}

const getElemsForCurrentStage = R.compose(getElemsForStage, getCurrentStage)

const getDoorsForCurrentStage = R.compose(getDoorsForStage, getCurrentStage)

const restCommandEqName = R.compose(nameEq, getRestOfCommand)

const addElemToPocket = (elem, state) => {
  const elems = getElemsForCurrentStage(state)
  const elemsWithoutElem = R.filter((e) => e.name !== elem.name, elems)

  const newStages = R.map((s) => {
    if (s.id === getCurrentStage(state).id) {
      return R.assoc('elems', elemsWithoutElem, s)
    } else {
      return s
    }
  }, getStages(state))

  const pocketWithElem = R.append(elem, getPocket(state))
  const computeNewState = (state) => {
    const tempState = R.assoc('stages', newStages, state)
    return R.assoc('pocket', pocketWithElem, tempState)
  }
  const newState = computeNewState(state)
  const message = `${elem.name} was taken`
  return {
    newState: newState,
    message: message
  }
}

const putElemToStage = (elem, state) => {
  const elems = getElemsForCurrentStage(state)
  const elemsWithElem = R.append(elem, elems)

  const newStages = R.map((s) => {
    if (s.id === getCurrentStage(state).id) {
      return R.assoc('elems', elemsWithElem, s)
    } else {
      return s
    }
  }, getStages(state))

  const pocketWithOutElem = R.filter((e) => e.name !== elem.name, getPocket(state))
  const computeNewState = (state) => {
    const tempState = R.assoc('stages', newStages, state)
    return R.assoc('pocket', pocketWithOutElem, tempState)
  }
  const newState = computeNewState(state)
  const message = `${elem.name} was put`
  return {
    newState: newState,
    message: message
  }
}

module.exports = {
  getCurrentStage,
  getPocket,
  getRestOfCommand,
  getElemsForCurrentStage,
  getDoorsForCurrentStage,
  addElemToPocket,
  putElemToStage,
  restCommandEq: restCommandEqName
}

/// ///////////////
// test in node =>
/// //////////////
const {
  state
} = require('../db/state')
console.log(getElemsForCurrentStage(state))
