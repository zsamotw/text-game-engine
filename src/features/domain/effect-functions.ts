import * as R from 'ramda'
import * as L from '../utils/lenses'
import { Effect, NextStageEffect, ElemEffect } from '../../models/effect'
import Elem from '../../models/elem'

const getOperation: (effect: Effect) => string = R.view(L.operationLens)

const getMessage: (effect: Effect) => string = R.view(L.messageLens)

const getNextStageId: (effect: NextStageEffect) => number = R.view(
  L.nextStageId
)

const getElem: (effect: ElemEffect) => Elem = R.view(L.elemLens)

const getCurrentStageId: (effect: ElemEffect) => number = R.view(
  L.currentStageIdLens
)

export { getOperation, getMessage, getNextStageId, getElem, getCurrentStageId }
