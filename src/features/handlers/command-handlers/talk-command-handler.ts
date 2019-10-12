import { Effect } from '../../../models/effect'
import * as AF from '../../domain/actor-functions'
import * as CF from '../../domain/command-functions'
import * as EO from '../../utils/effect-operations'
import * as L from '../../utils/lenses'
import * as S from 'sanctuary'
import * as SRF from '../../domain/string-functions'
import * as MH from '../../helpers/message-helper'
import Actor from '../../../models/actor'
import Command from '../../../models/command'

export const getTalkEffect = function(
  command: Command,
  currentStageId: number,
  actors: Actor[]
) {
  const actorName = CF.restOfCommand(command)
  const equalsToCurrentStageId = S.equals(currentStageId)
  const equalsToNameFromInput = SRF.equalsIgnoreCase(actorName)
  const actorsOnCurrentStage = S.filter((actor: Actor) =>
    S.and(equalsToNameFromInput(AF.nameOf(actor)))(
      equalsToCurrentStageId(AF.stageIdOf(actor))
    )
  )
  const actorsKnowledge = S.compose(
    S.map((actor: Actor) => L.actorKnowledgeLens.get()(actor))
  )(actorsOnCurrentStage)
  const noActorsOnStage = S.compose(S.equals([]))(actorsOnCurrentStage)
  const isAnybodyKnowsSomething = S.pipe([actorsKnowledge, S.equals([]), S.not])

  const talkEffect = () => {
    return {
      operation: EO.UndefinedCommand,
      message: noActorsOnStage(actors)
        ? 'There is no actors with that name'
        : isAnybodyKnowsSomething(actors)
        ? S.joinWith(' & ')(actorsKnowledge(actors) as string[])
        : `Persons with name:${actorName} have nothing to say`
    } as Effect
  }

  return S.equals(CF.restOfCommand(command))('')
    ? {
        operation: EO.NoStateChange,
        message: MH.messageWhenEmptyString(command)
      }
    : talkEffect()
}
