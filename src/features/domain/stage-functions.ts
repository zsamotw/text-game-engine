import * as S from 'sanctuary'
import * as L from '../utils/lenses'
import State from '../../models/state'
import Stage from '../../models/stage'
import Element from '../../models/element'
import{Maybe} from '../../features/utils/types'

const stagesOf: (state: State) => Stage[] = L.stateStagesLens.get()

//TODO make functions easier
const maybeStage: (
  stages: Stage[]
) => (stageId: number) => Maybe<Stage> = stages => stageId =>
  S.find(s => S.equals(S.prop('id')(s))(stageId))(stages)

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
    return 'No description for this stage'
  else {
    const stage = S.maybeToNullable(maybeStage) as Stage
    return L.stageDescriptionLens.get()(stage)
  }
}

const nameOfMaybeStage: (maybeStage: Maybe<Stage>) => String = maybeStage => {
  if (S.isNothing(maybeStage)) 
    return 'This stage has no name'
  else {
    const stage = S.maybeToNullable(maybeStage) as Stage
    return L.stageNameLens.get()(stage)
  }
}

export { stagesOf, maybeStage, elementsForMaybeStage, descriptionOfMaybeStage, nameOfMaybeStage }