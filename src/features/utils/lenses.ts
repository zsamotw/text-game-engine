const R = require('ramda')

const stagesLens = R.lensProp('stages')
const currentStageIdLens = R.lensProp('currentStageId')
const pocketLens = R.lensProp('pocket')
const doorsLens = R.lensProp('doors')
const actorsLens = R.lensProp('actors')
const systemMessages = R.lensProp('systemMessages')

const elemsLens = R.lensProp('elems')

const descriptionLens = R.lensProp('description')
const nameLens = R.lensProp('name')

const directionLens = R.lensProp('direction')
const restLens = R.lensProp('rest')

const messageLens = R.lensProp('message')
const nextStageId = R.lensProp('nextStageId')
const elemLens = R.lensProp('elem')

export {
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
  directionLens as typeLens,
  messageLens,
  nextStageId,
  elemLens
}
