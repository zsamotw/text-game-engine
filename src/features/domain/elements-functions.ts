import * as R from 'ramda'
import Stage from '../../models/stage'
import * as L from '../utils/lenses'

const getStageById = R.curry((i: number, stages: Stage[]) =>
  R.find(R.propEq('id', i))(stages)
)

const elementsFrom = (i: number, stages: Stage[]) =>
  R.view(L.elementsLens)(getStageById(i, stages))
