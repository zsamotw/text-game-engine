const R = require('ramda')
const GH = require('../helpers/genericHelper')

// const maxPocketSize = 2

// const getStages = state => R.prop('stages', state)

// const getPocket = state => R.prop('pocket', state)

// const isPlaceInPocket = state => getPocket(state).length < maxPocketSize

// const getCurrentStageId = state => R.prop('currentStageId', state)

// const getCurrentStage = state =>
//   R.find(
//     R.propEq('id', R.prop('currentStageId', state)),
//     R.prop('stages', state)
//   )

// const getStage = (stageId, state) =>
//   R.find(R.propEq('id', stageId), getStages(state))

// const getSystemMessages = state => R.prop('systemMessages', state)

// const getElemsForStage = stage => R.prop('elems', stage)

// const getDoors = stage => R.prop('doors', stage)

// const getWayOut = doors => {
//   if (doors.west !== undefined) {
//     return doors.west
//   } else if (doors.south !== undefined) {
//     return doors.south
//   } else if (doors.east !== undefined) {
//     return doors.east
//   } else if (doors.north !== undefined) {
//     return doors.north
//   }
// }

// const getActorsForCurrentStage = state =>
//   R.filter(
//     R.propEq('stageId', R.prop('currentStageId', state)),
//     R.prop('actors', state)
//   )

// const getRestOfCommand = command => R.prop('rest', command)

// const nameEq = name => R.propEq('name', name)

// const getElemsForCurrentStage = R.compose(
//   getElemsForStage,
//   getCurrentStage
// )

// const getDoorsForCurrentStage = R.compose(
//   getDoors,
//   getCurrentStage
// )

// const getDoorsForStage = R.compose(
//   getDoors,
//   getStage
// )

// const mapToValues = iterable => {
//   return R.filter(elem => elem !== undefined && elem !== null, iterable)
// }

// const getOpenedDoorsForStage = R.compose(
//   GH.mapToValues,
//   getDoorsForStage
// )

// const restCommandEqName = R.compose(
//   nameEq,
//   getRestOfCommand
// )

// const changePropertyOfIterable = (iterable, id, propName, newValue) => {
//   return R.map(elem => {
//     if (elem.id === id) {
//       return R.assoc(propName, newValue, elem)
//     } else {
//       return elem
//     }
//   }, iterable)
// }

module.exports = {
  // getStages,
  // getCurrentStageId,
  // getCurrentStage,
  // getStage,
  // getActorsForCurrentStage,
  // nameEq,
  // getSystemMessages,
  // getPocket,
  // isPlaceInPocket,
  // getRestOfCommand,
  // getElemsForCurrentStage,
  // getDoorsForCurrentStage,
  // getDoorsForStage,
  // getOpenedDoorsForStage,
  // getWayOut
  // changePropertyOfIterable
  // restCommandEqName
}
