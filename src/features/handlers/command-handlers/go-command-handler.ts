import { Effect, NextStageEffect } from '../../../models/effect'
import { Maybe } from '../../utils/types'
import * as CF from '../../domain/command-functions'
import * as DF from '../../domain/door-functions'
import * as EO from '../../utils/effect-operations'
import * as L from '../../utils/lenses'
import * as S from 'sanctuary'
import * as SF from '../../domain/stage-functions'
import * as MH from '../../helpers/message-helper'
import Command from '../../../models/command'
import Stage from '../../../models/stage'

export const getChangeStageEffect = function(
  command: Command,
  stages: Stage[],
  currentStageId: number
) {
  const maybeDoorsInCurrentStage = DF.maybeDoorsForStage(stages)(currentStageId)
  const doors = S.maybeToNullable(maybeDoorsInCurrentStage)

  const directionFrom: (command: Command) => string = S.compose(S.toLower)(
    L.commandRestLens.get()
  )

  const maybeOfMaybeNextStageId = S.get(() => true)(directionFrom(command))(
    doors
  )

  const changeStageEffectFrom = S.ifElse(S.isNothing)(() => {
    return {
      operation: EO.NoStateChange,
      message:
        'Oops. Something wrong. You can not go this direction. Try: north, south, west and east'
    } as Effect
  })(maybeOfMaybeNextStageId => {
    const maybeNextStageId = S.join(maybeOfMaybeNextStageId)
    const maybeNextStage = S.chain((id: number) => SF.maybeStage(stages)(id))(
      maybeNextStageId
    )

    const openDoorOrStay = S.ifElse(S.isJust)(() => {
      const name = SF.nameOfMaybeStage(maybeNextStage as Maybe<Stage>)
      return {
        operation: EO.ChangeNextStageId,
        nextStageId: S.maybeToNullable(maybeNextStageId),
        message: `You are in stage. It is ${name}`
      } as NextStageEffect
    })(() => {
      return {
        operation: EO.NoStateChange,
        message: `There are no way from this stage in ${directionFrom(
          command
        )} direction`
      } as NextStageEffect
    })

    return openDoorOrStay(maybeNextStage as Maybe<Stage>)
  })

  return S.equals(CF.restOfCommand(command))('')
    ? {
        operation: EO.NoStateChange,
        message: MH.messageWhenEmptyString(command)
      }
    : changeStageEffectFrom(maybeOfMaybeNextStageId)
}
