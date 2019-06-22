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

const typeLens = R.lensProp('type')
const restLens = R.lensProp('rest')

const messageLens = R.lensProp('message')
const nextStageId = R.lensProp('nextStageId')
const elemLens = R.lensProp('elem')

module.exports = {
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
  typeLens,
  messageLens,
  nextStageId,
  elemLens
}
