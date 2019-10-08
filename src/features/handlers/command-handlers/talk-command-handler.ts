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
  stageId: number,
  actors: Actor[]
) {
  const actorName = CF.restOfCommand(command)
  const stageIdEqualsTo = S.equals(stageId)
  const nameEqualsTo = SRF.equalsIgnoreCase(actorName)
  const actorsOnStage = S.filter((actor: Actor) =>
    S.and(nameEqualsTo(AF.nameOf(actor)))(stageIdEqualsTo(AF.stageIdOf(actor)))
  )
  const actorsKnowledge = S.compose(
    S.map((actor: Actor) => L.actorKnowledgeLens.get()(actor))
  )(actorsOnStage)
  const noActorsOnStage = S.compose(S.equals([]))(actorsOnStage)
  const isAnybodyKnowsSomething = S.pipe([actorsKnowledge, S.equals([]), S.not])

  const talkEffect = () => {
    return {
      operation: EO.UndefinedCommand,
      message: noActorsOnStage(actors)
        ? 'There is no actor with that name'
        : isAnybodyKnowsSomething(actors)
        ? S.joinWith(' & ')(actorsKnowledge(actors) as string[])
        : 'That person has nothing to say'
    } as Effect
  }

  return S.equals(CF.restOfCommand(command))('')
    ? {
        operation: EO.NoStateChange,
        message: MH.messageWhenEmptyString(command)
      }
    : talkEffect()
}
