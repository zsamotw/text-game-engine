import * as R from 'ramda'
import * as L from '../utils/lenses'
import {
  Effect,
  NextStageEffect,
  ElemEffect,
  ElemsEffect
} from '../../models/effect'
import Elem from '../../models/elem'

const getType: (result: Effect) => string = R.view(L.typeLens)

const getMessage: (result: Effect) => string = R.view(L.messageLens)

const getNextStatgeId: (result: NextStageEffect) => number = R.view(
  L.nextStageId
)

const getElem: (result: ElemEffect) => Elem = R.view(L.elemLens)

export { getType, getMessage, getNextStatgeId, getElem }
