const R = require('ramda')

const stateStagesLens = R.lensProp('stages')
const stateCurrentStageIdLens = R.lensProp('currentStageId')
const statePocketLens = R.lensProp('pocket')
const stateDoorsLens = R.lensProp('doors')
const stateActorsLens = R.lensProp('actors')

module.exports = {
  stateStagesLens,
  stateCurrentStageIdLens,
  statePocketLens,
  stateDoorsLens,
  stateActorsLens
}
