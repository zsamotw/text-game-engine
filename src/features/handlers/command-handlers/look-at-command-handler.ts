import { Effect } from '../../../models/effect'
import * as CF from '../../domain/command-functions'
import * as EO from '../../utils/effect-operations'
import * as EF from '../../domain/elements-functions'
import * as S from 'sanctuary'
import * as SF from '../../domain/stage-functions'
import * as MH from '../../helpers/message-helper'
import Command from '../../../models/command'
import Element from '../../../models/element'
import Stage from '../../../models/stage'

export const getDescriptionEffect = function(
  command: Command,
  stages: Stage[],
  currentStageId: number
) {
  const getElementEqualsTo = CF.elementEqualsToCommand
  const fromElementsInCurrentStage = (stages: Stage[]) =>
    S.compose(SF.elementsForMaybeStage)(SF.maybeStage(stages))

  const maybeElement = getElementEqualsTo(command)(
    fromElementsInCurrentStage(stages)(currentStageId)
  )

  const descriptionEffectFrom = S.ifElse(S.isNothing)(() => {
    return {
      operation: EO.NoStateChange,
      message: 'No such thing in this stage'
    } as Effect
  })(maybeElement => {
    const element = S.maybeToNullable(maybeElement) as Element
    return {
      operation: EO.NoStateChange,
      message: EF.descriptionOf(element)
    } as Effect
  })

  return S.equals(CF.restOfCommand(command))('')
    ? {
        operation: EO.NoStateChange,
        message: MH.messageWhenEmptyString(command)
      }
    : descriptionEffectFrom(maybeElement)
}
