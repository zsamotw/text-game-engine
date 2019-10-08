import { Effect } from '../../../models/effect'
import { Maybe } from '../../utils/types'
import * as AF from '../../domain/actor-functions'
import * as EO from '../../utils/effect-operations'
import * as S from 'sanctuary'
import * as SF from '../../domain/stage-functions'
import Actor from '../../../models/actor'
import Stage from '../../../models/stage'

export const getOverviewEffect = function(
  stages: Stage[],
  actors: Actor[],
  currentStageId: number
) {
  const effectForStage = (maybeStage: Maybe<Stage>) => {
    const getName = S.prop('name')

    const mapToNames = S.map(getName)

    const joinedNames = S.ifElse(S.equals([]))(() => 'No one thing here.')(
      names => ` Things in this stage: ${S.joinWith(', ')(names as string[])}.`
    )

    const elementsDescription = S.pipe([
      SF.elementsForMaybeStage,
      mapToNames,
      joinedNames
    ])

    const joinedActorsNames = S.ifElse(S.equals([]))(() => 'Nobody here')(
      actorsNames =>
        ` Persons here: ${S.joinWith(', ')(actorsNames as string[])}.`
    )

    const actorsDescription = S.pipe([
      AF.actorsForStage(actors),
      mapToNames,
      joinedActorsNames
    ])

    return {
      operation: EO.NoStateChange,
      message: `${SF.descriptionOfMaybeStage(maybeStage)}
                ${elementsDescription(maybeStage)}
                ${actorsDescription(currentStageId)}`
    } as Effect
  }

  const overviewEffectOf = S.ifElse(S.isNothing)(() => {
    return {
      operation: EO.NoStateChange,
      message: 'Error. No stage defined. Contact with game owner.'
    } as Effect
  })(effectForStage)

  const maybeCurrentStage = SF.maybeStage(stages)(currentStageId)

  return overviewEffectOf(maybeCurrentStage)
}
