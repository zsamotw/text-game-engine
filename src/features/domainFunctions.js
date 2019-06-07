const R = require('ramda')
const SF = require('./stateFunctions')

const getElemEqualsToCommand = (command, elems) =>
  R.find(SF.restCommandEqName(command), elems)

const addElemToPocket = (elem, state) => {
  const elems = SF.getElemsForCurrentStage(state)
  const elemsWithoutElem = R.filter(e => e.name !== elem.name, elems)

  const newStages = SF.changePropertyOfIterable(
    SF.getStages(state),
    SF.getCurrentStageId(state),
    'elems',
    elemsWithoutElem
  )

  const pocketWithElem = R.append(elem, SF.getPocket(state))

  const computeNewState = state => {
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
  const elems = SF.getElemsForCurrentStage(state)
  const elemsWithElem = R.append(elem, elems)

  const newStages = SF.changePropertyOfIterable(
    SF.getStages(state),
    SF.getCurrentStageId(state),
    'elems',
    elemsWithElem
  )

  const pocketWithOutElem = R.filter(
    e => e.name !== elem.name,
    SF.getPocket(state)
  )

  const computeNewState = state => {
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
