import * as L from '../utils/lenses'
import * as R from 'ramda'
import Actor from '../../models/actor'

const getActorsForStage: (actors: Actor[], stageId: number) => Actor[] = (
  actors,
  stageId
) => {
  return R.filter(R.propEq('stageId', stageId))(actors)
}

const getStageId = (actor: Actor) => R.view(L.stageIdLens, actor) as number 

const getInterval = (actor: Actor) => R.view(L.intervalLens, actor) as number

const getId = (actor: Actor) => R.view(L.idLens, actor) as number

export { getActorsForStage, getStageId, getInterval, getId }
