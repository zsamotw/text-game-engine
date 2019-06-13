const R = require('ramda')

const getActorsForCurrentStage = state =>
  R.filter(
    R.propEq('stageId', R.prop('currentStageId', state)),
    R.prop('actors', state)
  )

module.exports = {
  getActorsForCurrentStage
}
