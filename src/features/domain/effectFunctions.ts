import * as R from 'ramda'
import * as L from '../utils/lenses'
import { Effect, NextStageEffect, ElemEffect } from '../../models/effect'
import Elem from '../../models/elem'

const getDirection: (effect: Effect) => string = R.view(L.typeLens)

const getMessage: (effect: Effect) => string = R.view(L.messageLens)

const getNextStatgeId: (effect: NextStageEffect) => number = R.view(
  L.nextStageId
)

const getElem: (effect: ElemEffect) => Elem = R.view(L.elemLens)

export { getDirection, getMessage, getNextStatgeId, getElem }