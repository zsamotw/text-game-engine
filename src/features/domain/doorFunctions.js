const R = require('ramda')
const GH = require('../helpers/genericHelper')
const SF = require('./stagesFunctions')

const getDoors = stage => R.prop('doors', stage)

const getWayOut = doors => {
  if (doors.west !== undefined) {
    return doors.west
  } else if (doors.south !== undefined) {
    return doors.south
  } else if (doors.east !== undefined) {
    return doors.east
  } else if (doors.north !== undefined) {
    return doors.north
  }
}

const getDoorsForCurrentStage = R.compose(
  getDoors,
  SF.getCurrentStage
)

const getDoorsForStage = R.compose(
  getDoors,
  SF.getStage
)

const getOpenedDoorsForStage = R.compose(
  GH.mapToValues,
  getDoorsForStage
)

module.exports = {
  getDoorsForCurrentStage,
  getDoorsForStage,
  getOpenedDoorsForStage,
  getWayOut
}
