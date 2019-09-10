import * as L from '../utils/lenses'
import * as R from 'ramda'
import Actor from '../../models/actor'

const actorsForStage: (actors: Actor[], stageId: number) => Actor[] = (
  actors,
  stageId
) => {
  return R.filter(R.propEq('stageId', stageId))(actors)
}

const stageIdOf = (actor: Actor) => R.view(L.stageIdLens, actor) as number

const intervalOf = (actor: Actor) => R.view(L.intervalLens, actor) as number

const idOf = (actor: Actor) => R.view(L.idLens, actor) as number

const knowledgeOf = (actor: Actor) => R.view(L.knowledgeLens, actor) as string

export {
  actorsForStage,
  stageIdOf,
  intervalOf,
  idOf,
  knowledgeOf
}
