import { Effect, ElementEffect } from '../../../models/effect'
import * as CF from '../../domain/command-functions'
import * as EO from '../../utils/effect-operations'
import * as EF from '../../domain/elements-functions'
import * as S from 'sanctuary'
import * as MH from '../../helpers/message-helper'
import Command from '../../../models/command'
import Element from '../../../models/element'

export const getPutElementEffect = function(
  command: Command,
  currentStageId: number,
  pocket: Element[]
) {
  const maybeElementFromPocket = CF.elementEqualsToCommand(command)(pocket)

  const putEffectFrom = S.ifElse(S.isNothing)(() => {
    return {
      operation: EO.NoStateChange,
      message: 'No such thing in pocket'
    } as Effect
  })(maybeElementFromPocket => {
    const elementFromPocket = S.maybeToNullable(
      maybeElementFromPocket
    ) as Element

    return {
      operation: EO.PutElement,
      element: elementFromPocket,
      currentStageId: currentStageId,
      message: `${EF.nameOf(elementFromPocket)} is now put to the ground.`
    } as ElementEffect
  })

  return S.equals(CF.restOfCommand(command))('')
    ? {
        operation: EO.NoStateChange,
        message: MH.messageWhenEmptyString(command)
      }
    : putEffectFrom(maybeElementFromPocket)
}
