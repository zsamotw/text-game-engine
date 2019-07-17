import * as R from 'ramda'
import * as L from '../utils/lenses'
import State from '../../models/state'
import Stage from '../../models/stage'
import Elem from '../../models/elem'

const getStages: (state: State) => Stage[] = R.view(L.stagesLens)

// const getStage: (stageId: number, state: State) => Stage = (stageId, state) =>
//   R.find(R.propEq('id', stageId), getStages(state)) as Stage

const getCurrentStageId: (state: State) => number = R.view(L.currentStageIdLens)

const getStage: (stages: Stage[], stageId: number) => Stage = (
  stages,
  stageId
) => R.find(R.propEq('id', stageId))(stages)

const getElemsForStage: (stage: Stage) => Elem[] = R.view(L.elemsLens)

// const getElemsForCurrentStage: (state: State) => Elem[] = R.compose(
//   getElemsForStage,
//   getStage
// )

export {
  getStages,
  getStage,
  // getCurrentStageId,
  getStage as getCurrentStage,
  getElemsForStage
  // getElemsForCurrentStage
}
