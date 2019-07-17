import * as R from 'ramda'
import Stage from '../../models/stage'
import Elem from '../../models/elem'
import * as L from '../utils/lenses'

const getStageById = R.curry((i: number, stages: Stage[]) =>
  R.find(R.propEq('id', i))(stages)
)

const elemsFrom = (i: number, stages: Stage[]) =>
  R.view(L.elemsLens)(getStageById(i, stages))
