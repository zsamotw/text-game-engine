import * as R from 'ramda'
import * as L from '../utils/lenses'
import State from '../../models/state'
import Actor from '../../models/actor'

const getActorsForCurrentStage: (state: State) => Actor[] = state =>
  R.filter(
    R.propEq('stageId', R.view(L.currentStageIdLens, state)),
    R.view(L.actorsLens, state)
  )

export { getActorsForCurrentStage }
