const R = require('ramda')
const SF = require('./stagesFunctions')
const GH = require('../helpers/genericHelper')
const L = require('../utils/lenses')

const maxPocketSize = 2

const getPocket = R.view(L.pocketLens)

const isPlaceInPocket = state => getPocket(state).length < maxPocketSize

const addElemToPocket = (elem, state) => {
  const elemsInCurrentStage = SF.getElemsForCurrentStage(state)
  const elemsAfterTakeElem = R.filter(R.propEq('name', R.view(L.nameLens, elem)))(elemsInCurrentStage)

  const stagesAfterTakeElem = GH.updateIterable(
    SF.getStages(state),
    SF.getCurrentStageId(state),
    'elems',
    elemsAfterTakeElem
  )

  const addElemToPocket = R.append(elem, getPocket(state))

  const swapElemFromStageToPocket = state => {
    const stateAfterTakeElemFromStage = R.set(L.stagesLens, stagesAfterTakeElem, state)
    const stateAfterPutElemInPocket = R.set(L.pocketLens, addElemToPocket, stateAfterTakeElemFromStage)
    return stateAfterPutElemInPocket
  }

  return swapElemFromStageToPocket(state)
}

const putElemToStage = (elem, state) => {
  const addElemToElemsInCurrentStage = R.compose(
    R.append(elem),
    SF.getElemsForCurrentStage
  )

  const stagesAfterPutElem = GH.updateIterable(
    SF.getStages(state),
    SF.getCurrentStageId(state),
    'elems',
    addElemToElemsInCurrentStage(state)
  )

  const takeElemFromPocket = R.filter(
    e => e.name !== elem.name,
    getPocket
  )

  const swapElemFromPocketToStage = state => {
    const stateAfterPutElemInStage = R.set(L.stagesLens, stagesAfterPutElem, state)
    const stateAfterTakeElemFromPocket = R.set(L.pocketLens, takeElemFromPocket(state), stateAfterPutElemInStage)
    return stateAfterTakeElemFromPocket
  }

  return swapElemFromPocketToStage(state)
}

module.exports = {
  getPocket,
  isPlaceInPocket,
  maxPocketSize,
  addElemToPocket,
  putElemToStage
}
