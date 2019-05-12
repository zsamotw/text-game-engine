const R = require('ramda')

const maxPocketSize = 2

const getStages = (state) => R.prop('stages', state)

const getPocket = (state) => R.prop('pocket', state)

const isPlaceInPocket = (state) => getPocket(state).length < maxPocketSize

const getCurrentStageId = (state) => R.prop('currentStageId', state)

const getCurrentStage = (state) => R.find(R.propEq('id', R.prop('currentStageId', state)), R.prop('stages', state))

const getElemsForStage = (stage) => R.prop('elems', stage)

const getDoorsForStage = (stage) => R.prop('doors', stage)

const getRestOfCommand = (command) => R.prop('rest', command)

const nameEq = (name) => R.propEq('name', name)

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
  isPlaceInPocket: isPlaceInPocket,
  getRestOfCommand: getRestOfCommand,
  getElemsForCurrentStage: getElemsForCurrentStage,
  getDoorsForCurrentStage: getDoorsForCurrentStage,
  mapStages: mapStages,
  restCommandEqName: restCommandEqName
}
