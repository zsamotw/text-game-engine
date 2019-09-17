import * as R from 'ramda'
import * as S from 'sanctuary'
import * as L from '../utils/lenses'
import State from '../../models/state'
import Stage from '../../models/stage'
import Element from '../../models/element'
import{Maybe} from '../../features/utils/types'
const { equals } = require('sanctuary')

const stagesOf: (state: State) => Stage[] = R.view(L.stagesLens)

const stageFrom: (
  stages: Stage[]
) => (stageId: number) => Maybe<Stage> = stages => stageId =>
  S.find(s => equals(S.prop('id')(s))(stageId))(stages)

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

export { stagesOf, stageFrom, elementsForMaybeStage, descriptionOfMaybeStage }