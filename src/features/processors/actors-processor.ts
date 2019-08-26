import { appStore } from '../../state/reducers/state-reducers'
import { changeActorStage } from '../../state/actions/actor-actions';
import { map } from 'rxjs/operators'
import { nothingChange } from '../../state/actions/generic-actions';
import * as AF from '../domain/actor-functions'
import * as DF from '../domain/door-functions'
import * as R from 'ramda'
import * as Rx from 'rxjs'
import Actor from '../../models/actor';
import Doors from '../../models/doors';
import Stage from '../../models/stage';

//getActorStream :: State -> Observable<ActorMoveAction[]>
const getActorsStream = () =>
  Rx.interval(3000).pipe(
    map(interval => {
      const getChangeStageAction = (stages: Stage[], actor: Actor) => {
        const stageId = AF.getStageId(actor)
        const interval = AF.getInterval(actor)
        
        if ((interval * 1000) % interval === 0) {
          const doors = DF.getDoorsForStage(stages, stageId)
          const newStageId = DF.getWayOut(doors as Doors) as number
          const actorId = AF.getId(actor)

          return changeActorStage(actorId, newStageId)
        }
        else {
          return nothingChange()
        }
      }

      const actors = appStore.getState().actors
      const stages = appStore.getState().stages
      const actions = R.map(a => getChangeStageAction(stages, a), actors)
      
      return actions
    })
  )

export {
  getActorsStream
}
