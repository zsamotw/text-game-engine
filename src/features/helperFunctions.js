const R = require('ramda')

const getStages = (state) => {
  return R.prop('stages', state)
}

const getPocket = (state) => {
  return R.prop('pocket', state)
}

const getCurrentStageId = (state) => {
  return R.prop('currentStageId', state)
}

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

const mapStages = (stages, id, propName, obj) => {
  return R.map((s) => {
    if (s.id === id) {
      return R.assoc(propName, obj, s)
    } else {
      return s
    }
  }, stages)
}

module.exports = {
  getStages: getStages,
  getCurrentStageId: getCurrentStageId,
  getCurrentStage: getCurrentStage,
  getPocket: getPocket,
  getRestOfCommand: getRestOfCommand,
  getElemsForCurrentStage: getElemsForCurrentStage,
  getDoorsForCurrentStage: getDoorsForCurrentStage,
  mapStages: mapStages,
  restCommandEqName: restCommandEqName
}
