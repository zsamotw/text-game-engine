const R = require('ramda')
const L = require('../utils/lenses')

const getStages = R.view(L.stagesLens)

const getStage = (stageId, state) =>
  R.find(R.propEq('id', stageId), getStages(state))

const getCurrentStageId = R.view(L.currentStageIdLens)

const getCurrentStage = state =>
  R.find(
    R.propEq('id', getCurrentStageId(state)),
    R.view(L.stagesLens, state)
  )

const getElemsForStage = R.view(L.elemsLens)

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
