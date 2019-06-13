const R = require('ramda')

const getStages = state => R.prop('stages', state)

const getStage = (stageId, state) =>
  R.find(R.propEq('id', stageId), getStages(state))

const getCurrentStageId = state => R.prop('currentStageId', state)

const getCurrentStage = state =>
  R.find(
    R.propEq('id', R.prop('currentStageId', state)),
    R.prop('stages', state)
  )

const getElemsForStage = stage => R.prop('elems', stage)

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
