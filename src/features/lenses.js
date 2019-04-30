const R = require('ramda')

const stateStagesLens = R.lens(R.prop('stages'), R.assoc('stages'))
const stateCurrentStageIdLens = R.lens(R.prop('currentStageId'), R.assoc('currentStageId'))
const statePocketLens = R.lens(R.prop('pocket'), R.assoc('pocket'))

const stateNameLens = R.lens(R.prop('name'), R.assoc('name'))
const stateDescriptionLens = R.lens(R.prop('description'), R.assoc('description'))
const stateIdLens = R.lens(R.prop('id'), R.assoc('id'))
const stateElemsLens = R.lens(R.prop('elems'), R.assoc('elems'))
const stateDoorsLens = R.lens(R.prop('doors'), R.assoc('doors'))

module.exports = {
  stateStagesLens,
  stateCurrentStageIdLens,
  statePocketLens,
  stateNameLens,
  stateDescriptionLens,
  stateIdLens,
  stateElemsLens,
  stateDoorsLens
}
