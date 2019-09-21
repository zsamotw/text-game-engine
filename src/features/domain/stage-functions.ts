import * as S from 'sanctuary'
import * as L from '../utils/lenses'
import State from '../../models/state'
import Stage from '../../models/stage'
import Element from '../../models/element'
import{Maybe} from '../../features/utils/types'
import Doors from '../../models/doors'

const stagesOf: (state: State) => Stage[] = L.stateStagesLens.get()

const doorsOf: (stage: Stage) => Doors = L.stageDoorsLens.get()

const maybeStage: (
  stages: Stage[]
) => (stageId: number) => Maybe<Stage> = stages => stageId =>
  S.find(stage => S.equals(S.prop('id')(stage))(stageId))(stages)

const elementsForMaybeStage: (maybeStage: Maybe<Stage>) => Element[] = maybeStage => {
  if (S.isNothing(maybeStage)) 
    return []
  else {
    const stage = S.maybeToNullable(maybeStage) as Stage
    return L.stageElementsLens.get()(stage)
  }
}

const descriptionOfMaybeStage: (maybeStage: Maybe<Stage>) => String = maybeStage => {
  if (S.isNothing(maybeStage)) 
    return 'Oops you try to find not existing stage'
  else {
    const stage = S.maybeToNullable(maybeStage) as Stage
    return L.stageDescriptionLens.get()(stage)
  }
}

const nameOfMaybeStage: (maybeStage: Maybe<Stage>) => String = maybeStage => {
  if (S.isNothing(maybeStage)) 
    return 'Oops you try to find not existing stage'
  else {
    const stage = S.maybeToNullable(maybeStage) as Stage
    return L.stageNameLens.get()(stage)
  }
}

export { stagesOf, doorsOf, maybeStage, elementsForMaybeStage, descriptionOfMaybeStage, nameOfMaybeStage }