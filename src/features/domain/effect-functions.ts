import * as R from 'ramda'
import * as L from '../utils/lenses'
import { Effect, NextStageEffect, ElementEffect } from '../../models/effect'
import Element from '../../models/element'

const operationOf: (effect: Effect) => string = L.effectOperationLens

const messageOf: (effect: Effect) => string = L.effectMessageLens

const nextStageIdOf: (effect: NextStageEffect) => number = L.nextStageEffecNextStageIdLens

const elementOf: (effect: ElementEffect) => Element = L.elementEffectLensEffectLens

const currentStageIdOf: (effect: ElementEffect) => number = L.elementEffectCurrentStageIdLens

export { operationOf, messageOf,nextStageIdOf, elementOf, currentStageIdOf }
