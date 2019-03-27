const R = require('ramda')

const getCurrentStage = (state) => {
  return R.find(R.propEq('id', R.prop('currentStageId', state)), R.prop('stages', state))
}

const getElemsForStage = (stage) => {
  return R.prop('elems', stage)
}

const getDoorsForStage = (stage) => {
  return R.prop('doors', stage)
}
const getRestOfCommand = (command) => {
  return R.prop('rest', command)
}

const nameEq = (name) => {
  return R.propEq('name', name)
}

const getElemsForCurrentStage = R.compose(getElemsForStage, getCurrentStage)

const getDoorsForCurrentStage = R.compose(getDoorsForStage, getCurrentStage)

const restCommandEqName = R.compose(nameEq, getRestOfCommand)

module.exports = {
  getRestOfCommand,
  getElemsForCurrentStage,
  getDoorsForCurrentStage,
  restCommandEq: restCommandEqName
}

/// ///////////////
// test in node =>
/// //////////////
const {
  state
} = require('../db/state')
console.log(getElemsForCurrentStage(state))
