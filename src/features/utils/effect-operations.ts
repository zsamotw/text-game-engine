const NoStateChange = 'NoStateChange'
const ChangeNextStageId = 'ChangeNextStageId'
const TakeElement = 'TakeElement'
const PutElement = 'PutElement'
const Pocket = 'Pocket'
const UndefinedCommand = 'UndefinedCommand'

export type EffectOperation =
  | 'NoStateChange'
  | 'ChangeNextStageId'
  | 'TakeElement'
  | 'PutElement'
  | 'Pocket'
  | 'UndefinedCommand'

export {
  NoStateChange,
  ChangeNextStageId,
  TakeElement,
  PutElement,
  Pocket,
  UndefinedCommand
}
