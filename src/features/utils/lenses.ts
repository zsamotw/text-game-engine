import { lens } from 'lens.ts'
import Stage from '../../models/stage'
import Command from '../../models/command'
import * as R from 'ramda'
import Actor from '../../models/actor'
import { Effect, NextStageEffect, ElementEffect } from '../../models/effect'
import State from '../../models/state'

const stageLens = lens<Stage>()
const commandLens = lens<Command>()
const actorLens = lens<Actor>()
const effectLens = lens<Effect>()
const nextStageEffectLens = lens<NextStageEffect>()
const elementEffectLens = lens<ElementEffect>()
const stateLens = lens<State>()

const stageDoorsLens = stageLens.doors
const stageDescriptionLens = stageLens.description
const stageElementsLens = stageLens.elements

const commandRestLens = commandLens.rest

const actorIdLens = actorLens.id
const actorStageIdLens = actorLens.stageId
const actorIntervalLens = actorLens.interval
const actorKnowledgeLens = actorLens.knowledge

const effectOperationLens = effectLens.operation
const effectMessageLens = effectLens.message

const nextStageEffecNextStageIdLens = nextStageEffectLens.nextStageId

const elementEffectLensEffectLens = elementEffectLens.element
const elementEffectCurrentStageIdLens = elementEffectLens.currentStageId

const stateSystemMessagesLens = stateLens.messages

//ramda lenses
const idLens = R.lensProp('id')
const stagesLens = R.lensProp('stages')
const currentStageIdLens = R.lensProp('currentStageId')
const pocketLens = R.lensProp('pocket')
const doorsLens = R.lensProp('doors')
const actorsLens = R.lensProp('actors')
const systemMessages = R.lensProp('systemMessages')


const elementsLens = R.lensProp('elements')

const descriptionLens = R.lensProp('description')
const nameLens = R.lensProp('name')

const operationLens = R.lensProp('operation')
const restLens = R.lensProp('rest')

const messageLens = R.lensProp('message')
const nextStageId = R.lensProp('nextStageId')
const elementLens = R.lensProp('element')

// const stageIdLens = R.lensProp('stageId')
// const intervalLens = R.lensProp('interval')
// const knowledgeLens = R.lensProp('knowledge')


const commandsLens = R.lensProp('commands')
const positionLens = R.lensProp('position')

export {
  stageLens,
  stageDoorsLens,
  stageDescriptionLens,
  stageElementsLens,
  commandLens,
  commandRestLens, 
  actorIdLens,
  actorStageIdLens,
  actorIntervalLens,
  actorKnowledgeLens,
  effectOperationLens,
  effectMessageLens,
  nextStageEffecNextStageIdLens,
  elementEffectLensEffectLens,
  elementEffectCurrentStageIdLens,
  stateSystemMessagesLens,

//ramda lenses
  nameLens,
  descriptionLens,

  idLens,
  stagesLens,
  currentStageIdLens,
  pocketLens,
  doorsLens,
  actorsLens,
  systemMessages,
  elementsLens,
  restLens,
  operationLens,
  messageLens,
  nextStageId,
  elementLens,
  // stageIdLens,
  // intervalLens,
  // knowledgeLens,
  commandsLens,
  positionLens
}
