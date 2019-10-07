import { lens } from 'lens.ts'
import Stage from '../../models/stage'
import Command from '../../models/command'
import Actor from '../../models/actor'
import Element from '../../models/element'
import { Effect, NextStageEffect, ElementEffect } from '../../models/effect'
import State from '../../models/state'
import CommandsHistory from '../../models/commandsHistory'

const stageLens = lens<Stage>()
const stagesLens = lens<Stage[]>()
const commandLens = lens<Command>()
const actorLens = lens<Actor>()
const elementLens = lens<Element>()
const effectLens = lens<Effect>()
const nextStageEffectLens = lens<NextStageEffect>()
const elementEffectLens = lens<ElementEffect>()
const stateLens = lens<State>()
const commandHistoryLens = lens<CommandsHistory>()

const stageDoorsLens = stageLens.doors
const stageNameLens = stageLens.name
const stageDescriptionLens = stageLens.description
const stageElementsLens = stageLens.elements

const commandRestLens = commandLens.rest

const actorIdLens = actorLens.id
const actorNameLens = actorLens.name
const actorStageIdLens = actorLens.stageId
const actorIntervalLens = actorLens.interval
const actorKnowledgeLens = actorLens.knowledge

const elementNameLens = elementLens.name
const elementDescriptionLens = elementLens.description

const effectOperationLens = effectLens.operation
const effectMessageLens = effectLens.message

const nextStageEffecNextStageIdLens = nextStageEffectLens.nextStageId

const elementEffectLensEffectLens = elementEffectLens.element
const elementEffectCurrentStageIdLens = elementEffectLens.currentStageId

const stateSystemMessagesLens = stateLens.messages
const stateStagesLens = stateLens.stages

export {
  actorIdLens,
  actorIntervalLens,
  actorKnowledgeLens,
  actorLens,
  actorNameLens,
  actorStageIdLens,
  commandHistoryLens,
  commandLens,
  commandRestLens,
  effectMessageLens,
  effectOperationLens,
  elementDescriptionLens,
  elementEffectCurrentStageIdLens,
  elementEffectLensEffectLens,
  elementNameLens,
  nextStageEffecNextStageIdLens,
  stageDescriptionLens,
  stageDoorsLens,
  stageElementsLens,
  stageLens,
  stageNameLens,
  stagesLens,
  stateStagesLens,
  stateSystemMessagesLens
}
