const R = require('ramda')
const L = require('../elements/lenses')

const getStages = state => R.view(L.stagesLens, state)

const getStage = (stageId, state) =>
  R.find(R.propEq('id', stageId), getStages(state))

const getCurrentStageId = state => R.view(L.currentStageIdLens, state)

const getCurrentStage = state =>
  R.find(
    R.propEq('id', R.view(L.currentStageIdLens, state)),
    R.view(L.stagesLens, state)
  )

const getElemsForStage = stage => R.view(L.elemsLens, stage)

const getElemsForCurrentStage = R.compose(
  getElemsForStage,
  getCurrentStage
)

module.exports = {
  getStages,
  getStage,
  getCurrentStageId,
  getCurrentStage,
  getElemsForCurrentStage
}
