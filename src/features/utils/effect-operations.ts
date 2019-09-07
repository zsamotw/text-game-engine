const noStateChange = 'noStateChange'
const changeNextStageId = 'changeNextStageId'
const takeElement = 'takeElement'
const putElement = 'putElement'
const pocket = 'pocket'
const undefinedCommand = 'undefinedCommand'

export type EffectOperation =
  | 'noStateChange'
  | 'changeNextStageId'
  | 'takeElement'
  | 'putElement'
  | 'pocket'
  | 'undefinedCommand'

export {
  noStateChange,
  changeNextStageId,
  takeElement,
  putElement,
  pocket,
  undefinedCommand
}
