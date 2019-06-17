const R = require('ramda')
const SF = require('./stagesFunctions')
const GH = require('../helpers/genericHelper')
const L = require('../elements/lenses')

const maxPocketSize = 2

const getPocket = state => R.view(L.pocketLens, state)

const isPlaceInPocket = state => getPocket(state).length < maxPocketSize

const addElemToPocket = (elem, state) => {
  const elems = SF.getElemsForCurrentStage(state)
  const elemsWithoutElem = R.filter(e => e.name !== elem.name, elems)

  const newStages = GH.changePropertyOfIterable(
    SF.getStages(state),
    SF.getCurrentStageId(state),
    'elems',
    elemsWithoutElem
  )

  const pocketWithElem = R.append(elem, getPocket(state))

  const computeNewState = state => {
    const tempState = R.set(L.stagesLens, newStages, state)
    return R.set(L.pocketLens, pocketWithElem, tempState)
  }

  const newState = computeNewState(state)
  const message = `${elem.name} was taken`
  return {
    newState: newState,
    message: message
  }
}

const putElemToStage = (elem, state) => {
  const elems = SF.getElemsForCurrentStage(state)
  const elemsWithElem = R.append(elem, elems)

  const newStages = GH.changePropertyOfIterable(
    SF.getStages(state),
    SF.getCurrentStageId(state),
    'elems',
    elemsWithElem
  )

  const pocketWithOutElem = R.filter(
    e => e.name !== elem.name,
    getPocket(state)
  )

  const computeNewState = state => {
    const tempState = R.set(L.stagesLens, newStages, state)
    return R.set(L.pocketLens, pocketWithOutElem, tempState)
  }

  const newState = computeNewState(state)
  const message = `${elem.name} was put`
  return {
    newState: newState,
    message: message
  }
}

module.exports = {
  getPocket,
  isPlaceInPocket,
  maxPocketSize,
  addElemToPocket,
  putElemToStage
}
