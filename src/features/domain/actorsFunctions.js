const R = require('ramda')
const L = require('../elements/lenses')

const getActorsForCurrentStage = state =>
  R.filter(
    R.propEq('stageId', R.view(L.currentStageIdLens, state)),
    R.view(L.actorsLens, state)
  )

module.exports = {
  getActorsForCurrentStage
}
