import { Effect, ElementEffect } from '../../../models/effect'
import * as CF from '../../domain/command-functions'
import * as EO from '../../utils/effect-operations'
import * as EF from '../../domain/elements-functions'
import * as PF from '../../domain/pocket-functions'
import * as S from 'sanctuary'
import * as SF from '../../domain/stage-functions'
import * as MH from '../../helpers/message-helper'
import Command from '../../../models/command'
import Element from '../../../models/element'
import Stage from '../../../models/stage'

export const getTakenElementEffect = function(
  command: Command,
  stages: Stage[],
  currentStageId: number,
  pocket: Element[]
) {
  const getElementEqualsTo = CF.elementEqualsToCommand
  const currentStage = SF.maybeStage(stages)(currentStageId)
  const FromElementsOnCurrentStage = SF.elementsForMaybeStage(currentStage)

  const maybeTakenElement = getElementEqualsTo(command)(
    FromElementsOnCurrentStage
  )
  const isPlace = PF.isPlaceInPocket(pocket)

  const takeEffect = () => {
    switch (true) {
      case S.not(isPlace): {
        return {
          operation: EO.NoStateChange,
          message:
            'There is no place in pocket. Your pocket is full. You can put unused things to the ground and take others'
        } as Effect
      }

      case isPlace && S.isJust(maybeTakenElement):
        const element = S.maybeToNullable(maybeTakenElement)

        return {
          operation: EO.TakeElement,
          element: element,
          currentStageId: currentStageId,
          message: `${EF.nameOf(element as Element)} is taken`
        } as ElementEffect

      case isPlace && S.isNothing(maybeTakenElement):
        return {
          operation: EO.NoStateChange,
          message: 'No such thing in this stage'
        } as Effect
    }
  }

  return S.equals(CF.restOfCommand(command))('')
    ? {
        operation: EO.NoStateChange,
        message: MH.messageWhenEmptyString(command)
      }
    : takeEffect()
}
