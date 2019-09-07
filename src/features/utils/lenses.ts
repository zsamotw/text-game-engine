const R = require('ramda')

const idLens = R.lensProp('id')
const stagesLens = R.lensProp('stages')
const currentStageIdLens = R.lensProp('currentStageId')
const pocketLens = R.lensProp('pocket')
const doorsLens = R.lensProp('doors')
const actorsLens = R.lensProp('actors')
const systemMessages = R.lensProp('systemMessages')

const elemsLens = R.lensProp('elems')

const descriptionLens = R.lensProp('description')
const nameLens = R.lensProp('name')

const operationLens = R.lensProp('operation')
const restLens = R.lensProp('rest')

const messageLens = R.lensProp('message')
const nextStageId = R.lensProp('nextStageId')
const elemLens = R.lensProp('elem')

const stageIdLens = R.lensProp('stageId')
const intervalLens = R.lensProp('interval')
const knowledgeLens = R.lensProp('knowledge')

const commandsLens = R.lensProp('commands')
const positionLens = R.lensProp('position')

export {
  idLens,
  stagesLens,
  currentStageIdLens,
  pocketLens,
  doorsLens,
  actorsLens,
  systemMessages,
  elemsLens,
  descriptionLens,
  restLens,
  nameLens,
  operationLens,
  messageLens,
  nextStageId,
  elemLens,
  stageIdLens,
  intervalLens,
  knowledgeLens,
  commandsLens,
  positionLens
}
