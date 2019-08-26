import { CHANGE_ACTOR_STAGE } from './action-types'
import { ActorMoveAction } from '../../models/action';

const changeActorStage = (actorId: number, stageId: number) => {
  return {
    type: CHANGE_ACTOR_STAGE,
    actorId: actorId,
    stageId: stageId
  } as ActorMoveAction
}

export { changeActorStage }