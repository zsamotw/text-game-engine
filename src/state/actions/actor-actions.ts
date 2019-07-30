import { CHANGE_ACTOR_STAGE } from './action-types'
import { ActorAction } from '../../models/action';

const changeActorStage = (actorId: number, stageId: number) => {
  return {
    type: CHANGE_ACTOR_STAGE,
    actorId: actorId,
    stageId: stageId
  } as ActorAction
}

export { changeActorStage }