import * as R from 'ramda'
import Stage from '../../models/stage'
import * as L from '../utils/lenses'

const stageById = R.curry((i: number, stages: Stage[]) =>
  R.find(R.propEq('id', i))(stages)
)

const elementsFrom = (i: number, stages: Stage[]) =>
  R.view(L.elementsLens)(stageById(i, stages))
