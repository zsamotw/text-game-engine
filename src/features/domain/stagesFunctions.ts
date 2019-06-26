import * as R from 'ramda'
import * as L from '../utils/lenses'
import State from '../../models/state'
import Stage from '../../models/stage'
import Elem from '../../models/elem'

const viewStages: (state: State) => Stage[] = R.view(L.stagesLens)

const getStage: (stageId: number, state: State) => Stage = (stageId, state) =>
  R.find(R.propEq('id', stageId), viewStages(state)) as Stage

const viewCurrentStageId: (state: State) => number = R.view(
  L.currentStageIdLens
)

const getCurrentStage: (state: State) => Stage = state =>
  R.find(R.propEq('id', viewCurrentStageId(state)), R.view(L.stagesLens, state))

const viewElemsForStage: (stage: Stage) => Elem[] = R.view(L.elemsLens)

const getElemsForCurrentStage: (state: State) => Elem[] = R.compose(
  viewElemsForStage,
  getCurrentStage
)

export {
  viewStages,
  getStage,
  viewCurrentStageId,
  getCurrentStage,
  getElemsForCurrentStage
}
