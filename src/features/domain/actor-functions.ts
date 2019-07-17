import * as R from 'ramda'
import Actor from '../../models/actor'

const getActorsForStage: (actors: Actor[], stageId: number) => Actor[] = (
  actors,
  stageId
) => {
  return R.filter(R.propEq('stageId', stageId))(actors)
}

export { getActorsForStage }
