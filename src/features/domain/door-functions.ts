import * as R from 'ramda'
import * as L from '../utils/lenses'
import * as SF from './stage-functions'
import Doors from '../../models/doors'
import Stage from '../../models/stage'
import { getRandomInt } from './general-usage-functions'

const doorsOf: (stage: Stage) => Doors = R.view(L.doorsLens)

const getWayOut = (doors: Doors) => {
  const wayOut = R.compose(getRandomInt, R.length, openedDoors)
  return wayOut(doors) 
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

const openedDoors = (doors: Doors | undefined) => {
  const getValues = (doors: Doors) =>  R.reject(R.isNil)(R.values(doors))
  return  R.ifElse(R.isNil, R.always(undefined), getValues)(doors)
}

const openedDoorsForStage = R.compose(
  openedDoors,
  doorsForStage
)

export {
  openedDoors,
  doorsForCurrentStage,
  doorsForStage,
  openedDoorsForStage,
  getWayOut
}
