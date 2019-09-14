import { lens } from 'lens.ts'
import Stage from '../../models/stage'
import Command from '../../models/command'
import * as R from 'ramda'

const stageLens = lens<Stage>()
const commandLens = lens<Command>()

const commandRestLens = commandLens.rest.get()

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

const stageIdLens = R.lensProp('stageId')
const intervalLens = R.lensProp('interval')
const knowledgeLens = R.lensProp('knowledge')

const commandsLens = R.lensProp('commands')
const positionLens = R.lensProp('position')

export {
  stageLens,
  commandLens,
  commandRestLens, 

//ramda lenses
  idLens,
  stagesLens,
  currentStageIdLens,
  pocketLens,
  doorsLens,
  actorsLens,
  systemMessages,
  elementsLens,
  descriptionLens,
  restLens,
  nameLens,
  operationLens,
  messageLens,
  nextStageId,
  elementLens,
  stageIdLens,
  intervalLens,
  knowledgeLens,
  commandsLens,
  positionLens
}
