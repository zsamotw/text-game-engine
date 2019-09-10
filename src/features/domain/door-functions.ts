import * as R from 'ramda'
import * as L from '../utils/lenses'
import * as SF from './stage-functions'
import Doors from '../../models/doors'
import Stage from '../../models/stage'

const doorsOf: (stage: Stage) => Doors = R.view(L.doorsLens)

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

const doorsForCurrentStage: (
  stages: Stage[],
  currentStageId: number
) => Doors = R.compose(
  doorsOf,
  SF.stageFrom
)

const doorsForStage = R.compose(
  doorsOf,
  SF.stageFrom
)

const openDoors = (doors: Doors | undefined) => {
  const getValues = (doors: Doors) => {
    return R.reject(R.isNil)(R.values(doors))
  }
  R.ifElse(R.isNil, R.always(undefined), getValues)
}

const openedDoorsForStage = R.compose(
  openDoors,
  doorsForStage
)

export {
  doorsForCurrentStage,
  doorsForStage,
  openedDoorsForStage,
  getWayOut
}
