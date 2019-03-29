const R = require('ramda')
const {
  getCurrentStageId,
  getElemsForCurrentStage,
  getPocket,
  getStages,
  mapStages,
  restCommandEq: restCommandEqName
} = require('./helperFunctions')

const getElemEqualsToCommand = (command, state) => R.find(restCommandEqName(command), getElemsForCurrentStage(state))

const addElemToPocket = (elem, state) => {
  const elems = getElemsForCurrentStage(state)
  const elemsWithoutElem = R.filter((e) => e.name !== elem.name, elems)

  const newStages = mapStages(getStages(state), getCurrentStageId(state), 'elems', elemsWithoutElem)

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

  const newStages = mapStages(getStages(state), getCurrentStageId(state), 'elems', elemsWithElem)

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
  getElemEqualsToCommand,
  addElemToPocket,
  putElemToStage
}
