import * as L from '../utils/lenses'
import  * as S from 'sanctuary'
import * as SF from './stage-functions'
import Doors from '../../models/doors'
import Stage from '../../models/stage'
import { getRandomInt } from './general-usage-functions'
const { size } =  require('sanctuary')

const doorsOf: (stage: Stage) => Doors = stage => L.stageDoorsLens.get()(stage)

// public api
const getRandomWayOut = (doors: Doors) => {
  const stageIdToGo = S.pipe([openedDoors, S.map(size), S.map(getRandomInt)])
  return stageIdToGo(doors)
}

const doorsForStage = (stages: Stage[]) =>
  S.compose(doorsOf)(SF.stageFrom(stages))

const openedDoors = (doors: Doors) => {
  const stagesIds = S.values(doors as any)
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
