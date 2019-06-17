const R = require('ramda')
const L = require('../utils/lenses')

const getActorsForCurrentStage = state =>
  R.filter(
    R.propEq('stageId', R.view(L.currentStageIdLens, state)),
    R.view(L.actorsLens, state)
  )

module.exports = {
  getActorsForCurrentStage
}
