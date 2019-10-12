import * as L from '../utils/lenses'
import * as S from 'sanctuary'
import Actor from '../../models/actor'

const actorsForStage: (
  actors: Actor[]
) => (stageId: number) => Actor[] = actors => stageId =>
  S.filter((a: Actor) => S.equals(stageId)(S.prop('stageId')(a)))(actors)

const idOf: (actor: Actor) => number = L.actorIdLens.get()

const nameOf: (actor: Actor) => string = L.actorNameLens.get()

const descriptionOf: (actor: Actor) => string = L.actorDescriptionLens.get()

const stageIdOf: (actor: Actor) => number = L.actorStageIdLens.get()

const intervalOf: (actor: Actor) => number = L.actorIntervalLens.get()

const knowledgeOf: (actor: Actor) => string = L.actorKnowledgeLens.get()

export {
  actorsForStage,
  nameOf,
  descriptionOf,
  stageIdOf,
  intervalOf,
  idOf,
  knowledgeOf
}
