import * as R from 'ramda'
import * as L from '../utils/lenses'
import State from '../../models/state'
import Stage from '../../models/stage'
import Elem from '../../models/elem'

const getStages: (state: State) => Stage[] = R.view(L.stagesLens)

const getStage: (stageId: number, state: State) => Stage = (stageId, state) =>
  R.find(R.propEq('id', stageId), getStages(state)) as Stage

const getCurrentStageId: (state: State) => number = R.view(L.currentStageIdLens)

const getCurrentStage: (state: State) => Stage = state =>
  R.find(R.propEq('id', getCurrentStageId(state)), R.view(L.stagesLens, state))

const getElemsForStage: (stage: Stage) => Elem[] = R.view(L.elemsLens)

const getElemsForCurrentStage: (state: State) => Elem[] = R.compose(
  getElemsForStage,
  getCurrentStage
)

export {
  getStages,
  getStage,
  getCurrentStageId,
  getCurrentStage,
  getElemsForCurrentStage
}
