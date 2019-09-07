import * as R from 'ramda'
import * as L from '../utils/lenses'
import { Effect, NextStageEffect, ElementEffect } from '../../models/effect'
import Element from '../../models/element'

const getOperation: (effect: Effect) => string = R.view(L.operationLens)

const getMessage: (effect: Effect) => string = R.view(L.messageLens)

const getNextStageId: (effect: NextStageEffect) => number = R.view(
  L.nextStageId
)

const getElement: (effect: ElementEffect) => Element = R.view(L.elementLens)

const getCurrentStageId: (effect: ElementEffect) => number = R.view(
  L.currentStageIdLens
)

export { getOperation, getMessage, getNextStageId, getElement, getCurrentStageId }
