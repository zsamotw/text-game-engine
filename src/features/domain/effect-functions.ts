import * as R from 'ramda'
import * as L from '../utils/lenses'
import { Effect, NextStageEffect, ElementEffect } from '../../models/effect'
import Element from '../../models/element'

const operationOf: (effect: Effect) => string = R.view(L.operationLens)

const messageOf: (effect: Effect) => string = R.view(L.messageLens)

const nextStageIdOf: (effect: NextStageEffect) => number = R.view(
  L.nextStageId
)

const elementOf: (effect: ElementEffect) => Element = R.view(L.elementLens)

const currentStageIdOf: (effect: ElementEffect) => number = R.view(
  L.currentStageIdLens
)

export { operationOf, messageOf,nextStageIdOf, elementOf, currentStageIdOf }
