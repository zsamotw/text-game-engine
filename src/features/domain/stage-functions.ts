import * as R from 'ramda'
import * as L from '../utils/lenses'
import State from '../../models/state'
import Stage from '../../models/stage'
import Element from '../../models/element'

const stagesOf: (state: State) => Stage[] = R.view(L.stagesLens)

const stageFrom: (stages: Stage[], stageId: number) => Stage = (
  stages,
  stageId
) => R.find(R.propEq('id', stageId))(stages)

const elementsForStage: (stage: Stage) => Element[] = R.view(L.elementsLens)

export { stagesOf, stageFrom, elementsForStage }
