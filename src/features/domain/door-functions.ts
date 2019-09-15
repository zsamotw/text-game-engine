import * as L from '../utils/lenses'
import * as SF from './stage-functions'
import Doors from '../../models/doors'
import Stage from '../../models/stage'
import { getRandomInt } from './general-usage-functions'
const S =  require('sanctuary')

const doorsOf: (stage: Stage) => Doors = stage => L.stageDoorsLens(stage)

const getRandomWayOut = (doors: Doors) => {
  const stageIdToGo = S.pipe([openedDoors, S.map(S.size), S.map(getRandomInt)])
  return stageIdToGo(doors)
}

const doorsForStage = (stages: Stage[]) =>
  S.compose(doorsOf)(SF.stageFrom(stages))

const openedDoors = (doors: Doors) => {
  const stagesIds = S.values(doors)
  const justStagesIds = S.pipe([S.filter(S.isJust), S.sequence(S.Maybe)])
  return justStagesIds(stagesIds)
}

const openedDoorsForStage = (stages: Stage[]) => S.compose(openedDoors)(doorsForStage(stages))

export {
  openedDoors,
  doorsForStage,
  openedDoorsForStage,
  getRandomWayOut 
}
