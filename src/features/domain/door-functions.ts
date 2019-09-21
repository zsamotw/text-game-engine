import * as L from '../utils/lenses'
import * as S from 'sanctuary'
import * as SF from './stage-functions'
import Doors from '../../models/doors'
import Stage from '../../models/stage'
import { getRandomInt } from './general-usage-functions'
import { Maybe } from '../../features/utils/types'
const { size } = require('sanctuary')

//TODO make functions easier
const maybeDoorsOf: (maybeStage: Maybe<Stage>) => Maybe<Doors> = maybeStage => {
  const maybeDoorsOf = S.ifElse(S.isNothing)(() => S.Nothing)(maybeStage => {
    const stage = S.maybeToNullable(maybeStage)
    return S.Just(L.stageDoorsLens.get()(stage))
  })

  return maybeDoorsOf(maybeStage) as Maybe<Doors>
}

// public api
const getRandomWayOut = (maybeDoors: Maybe<Doors>) => {
  const maybeIdOfNextStageFrom = S.ifElse(S.isNothing)(() => S.isNothing)(
    justDoors => {
      const stageIdToGo = S.pipe([
        openedDoors,
        S.map(size),
        S.map(getRandomInt)
      ])
      return S.Just(stageIdToGo(justDoors))
    }
  )
  return maybeIdOfNextStageFrom(maybeDoors)
}

const maybeDoorsForStage = (stages: Stage[]) =>
  S.compose(maybeDoorsOf)(SF.maybeStage(stages))

const openedDoors = (maybeDoors: Maybe<Doors>) => {
  const openedDoorsOf = S.ifElse(S.isNothing)(() => [])(justDoors => {
    const doors = S.maybeToNullable(justDoors)
    const stagesIds = S.values(doors as any)
    const justStagesIds = S.pipe([S.filter(S.isJust), S.sequence(S.Maybe)])
    return justStagesIds(stagesIds)
  })
  return openedDoorsOf(maybeDoors)
}

const openedDoorsForStage = (stages: Stage[]) =>
  S.compose(openedDoors)(maybeDoorsForStage(stages))

export { openedDoors, maybeDoorsForStage, openedDoorsForStage, getRandomWayOut }
