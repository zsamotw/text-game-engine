import { Effect } from '../../../models/effect'
import * as AF from '../../domain/actor-functions'
import * as CF from '../../domain/command-functions'
import * as EO from '../../utils/effect-operations'
import * as EF from '../../domain/elements-functions'
import * as S from 'sanctuary'
import * as SF from '../../domain/stage-functions'
import * as MH from '../../helpers/message-helper'
import * as SRF from '../../domain/string-functions'
import Actor from '../../../models/actor'
import Command from '../../../models/command'
import Element from '../../../models/element'
import Stage from '../../../models/stage'
import { match } from 'minta'

export const getDescriptionEffect = function(
  command: Command,
  stages: Stage[],
  currentStageId: number,
  actors: Actor[]
) {
  const getElementEqualsTo = CF.elementEqualsToCommand
  const fromElementsInCurrentStage = (stages: Stage[]) =>
    S.compose(SF.elementsForMaybeStage)(SF.maybeStage(stages))

  const maybeElement = getElementEqualsTo(command)(
    fromElementsInCurrentStage(stages)(currentStageId)
  )

  const actorName = CF.restOfCommand(command)
  const equalsToCurrentStageId = S.equals(currentStageId)
  const equalsToNameFromInput = SRF.equalsIgnoreCase(actorName)
  const actorsOnCurrentStage = S.filter((actor: Actor) =>
    equalsToCurrentStageId(AF.stageIdOf(actor))
  )
  const maybeActor = S.compose(
    S.find((actor: Actor) => equalsToNameFromInput(AF.nameOf(actor)))
  )(actorsOnCurrentStage)(actors)

  const maybes = [maybeElement, maybeActor]

  const description = match(maybes)(
    S.isJust(maybes[0]),
    () => {
      const element = S.maybeToNullable(maybeElement) as Element
      return {
        operation: EO.NoStateChange,
        message: EF.descriptionOf(element)
      } as Effect
    },
    S.isJust(maybes[1]),
    () => {
      const actor = S.maybeToNullable(maybeActor) as Actor
      return {
        operation: EO.NoStateChange,
        message: AF.descriptionOf(actor)
      } as Effect
    },
    otherwise => {
      return {
        operation: EO.NoStateChange,
        message: 'No such thing and actor in this stage'
      }
    }
  )

  return S.equals(CF.restOfCommand(command))('')
    ? {
        operation: EO.NoStateChange,
        message: MH.messageWhenEmptyString(command)
      }
    : description
}
