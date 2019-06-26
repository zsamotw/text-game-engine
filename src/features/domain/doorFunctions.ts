import R from 'ramda'
import * as L from '../utils/lenses'
import * as GH from '../helpers/genericHelper'
import * as SF from './stagesFunctions'
import Doors from '../../models/doors'
import State from '../../models/state'
import Stage from '../../models/stage'

const viewDoors: (stage: Stage) => Doors = R.view(L.doorsLens)

const getWayOut = (doors: Doors) => {
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

const getDoorsForCurrentStage: (state: State) => Doors = R.compose(
  viewDoors,
  SF.getCurrentStage
)

const getDoorsForStage = R.compose(
  viewDoors,
  SF.getStage
)

const getOpenDoors = (doors: Doors | undefined) => {
  const getValues = (doors: Doors) => {
    return R.reject(R.isNil)(R.values(doors))
  }
  R.ifElse(R.isNil, R.always(undefined), getValues)
}

const getOpenedDoorsForStage = R.compose(
  getOpenDoors,
  getDoorsForStage
)

export {
  getDoorsForCurrentStage,
  getDoorsForStage,
  getOpenedDoorsForStage,
  getWayOut
}
