import * as Rx from 'rxjs'
import { appStore } from '../../state/reducers/state-reducers'
import { map } from 'rxjs/operators'
import * as DF from '../domain/door-functions'
import { changeActorStage } from '../../state/actions/actor-actions';
import { nothingChange } from '../../state/actions/generic-actions';
import Stage from '../../models/stage';
import Actor from '../../models/actor';
import Doors from '../../models/doors';
import * as L from '../utils/lenses'
import * as R from 'ramda'

//getActorStream :: State -> Observable<ActorAction[]>
const getActorsStream = () =>
  Rx.interval(3000).pipe(
    map(interval => {
      const getChangeStageAction = (stages: Stage[], actor: Actor) => {
        if ((interval * 1000) % actor.interval === 0) {
          const stageId = R.view(L.stageIdLens, actor) as number
          const doors = DF.getDoorsForStage(stages, stageId)
          const newStageId = DF.getWayOut(doors as Doors) as number
          const actorId = R.view(L.idLens, actor) as number
          return changeActorStage(actorId, newStageId)
        }
        else {
          return nothingChange()
        }
      }

      const actors = appStore.getState().actors
      const stages = appStore.getState().stages
      const actions = actors.map(a => getChangeStageAction(stages, a))
      return actions
    })
  )

export {
  getActorsStream
}
