const noStateChange = 'noStateChange'
const changeNextStageId = 'changeNextStageId'
const takeElem = 'takeElem'
const putElem = 'putElem'
const pocket = 'pocket'
const undefinedCommand = 'undefinedCommand'

export type EffectOperation =
  | 'noStateChange'
  | 'changeNextStageId'
  | 'takeElem'
  | 'putElem'
  | 'pocket'
  | 'undefinedCommand'

export {
  noStateChange,
  changeNextStageId,
  takeElem,
  putElem,
  pocket,
  undefinedCommand
}
