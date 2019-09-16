import * as L from '../utils/lenses'
import { Effect, NextStageEffect, ElementEffect } from '../../models/effect'
import Element from '../../models/element'

const operationOf: (effect: Effect) => string = L.effectOperationLens.get()

const messageOf: (effect: Effect) => string = L.effectMessageLens.get()

const nextStageIdOf: (effect: NextStageEffect) => number = L.nextStageEffecNextStageIdLens.get()

const elementOf: (effect: ElementEffect) => Element = L.elementEffectLensEffectLens.get()

const currentStageIdOf: (effect: ElementEffect) => number = L.elementEffectCurrentStageIdLens.get()

export { operationOf, messageOf,nextStageIdOf, elementOf, currentStageIdOf }
