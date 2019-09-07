import * as R from 'ramda'
import * as L from '../utils/lenses'
import State from '../../models/state'
import Stage from '../../models/stage'
import Element from '../../models/element'

const getStages: (state: State) => Stage[] = R.view(L.stagesLens)

const getStage: (stages: Stage[], stageId: number) => Stage = (
  stages,
  stageId
) => R.find(R.propEq('id', stageId))(stages)

const getElementsForStage: (stage: Stage) => Element[] = R.view(L.elementsLens)

export { getStages, getStage, getElementsForStage }
