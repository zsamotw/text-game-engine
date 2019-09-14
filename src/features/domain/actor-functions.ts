import * as L from '../utils/lenses'
import * as S from 'sanctuary'
import Actor from '../../models/actor'

const actorsForStage: (actors: Actor[]) => (stageId: number) => Actor[] = 
  actors =>
  stageId => S.filter((a: Actor) => S.equals(stageId)(S.prop('stageId')(a)))(actors)

const stageIdOf = (actor: Actor) => L.actorStageIdLens(actor)

const intervalOf = (actor: Actor) => L.actorIntervalLens(actor)

const idOf = (actor: Actor) => L.actorIdLens(actor)

const knowledgeOf = (actor: Actor) => L.actorKnowledgeLens(actor)

export {
  actorsForStage,
  stageIdOf,
  intervalOf,
  idOf,
  knowledgeOf
}
