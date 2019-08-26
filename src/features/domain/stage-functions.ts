import * as R from 'ramda'
import * as L from '../utils/lenses'
import State from '../../models/state'
import Stage from '../../models/stage'
import Elem from '../../models/elem'

const getStages: (state: State) => Stage[] = R.view(L.stagesLens)

const getStage: (stages: Stage[], stageId: number) => Stage = (
  stages,
  stageId
) => R.find(R.propEq('id', stageId))(stages)

const getElemsForStage: (stage: Stage) => Elem[] = R.view(L.elemsLens)

export { getStages, getStage, getElemsForStage }
