import * as L from '../utils/lenses'
import * as S from 'sanctuary'
import Actor from '../../models/actor'

const actorsForStage: (actors: Actor[]) => (stageId: number) => Actor[] = 
  actors =>
  stageId => S.filter((a: Actor) => S.equals(stageId)(S.prop('stageId')(a)))(actors)

const nameOf = (actor: Actor) => L.actorNameLens.get()(actor)

const stageIdOf = (actor: Actor) => L.actorStageIdLens.get()(actor)

const intervalOf = (actor: Actor) => L.actorIntervalLens.get()(actor)

const idOf = (actor: Actor) => L.actorIdLens.get()(actor)

const knowledgeOf = (actor: Actor) => L.actorKnowledgeLens.get()(actor)

export {
  actorsForStage,
  nameOf,
  stageIdOf,
  intervalOf,
  idOf,
  knowledgeOf
}
