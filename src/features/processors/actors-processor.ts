import {
  appStore
} from '../../state/reducers/state-reducers'
import {
  changeActorStage
} from '../../state/actions/actor-actions';
import {
  map
} from 'rxjs/operators'
import {
  nothingChange
} from '../../state/actions/generic-actions';
import * as AF from '../domain/actor-functions'
import * as DF from '../domain/door-functions'
import * as Rx from 'rxjs'
import Actor from '../../models/actor';
import Stage from '../../models/stage';
const S = require('sanctuary')

//getActorStream :: State -> Observable<ActorMoveAction[]>
const getActorsStream = () =>
  Rx.interval(10000)
    .pipe(
      map(interval => {
        const getChangeStageAction = (stages: Stage[], actor: Actor) => {
          const stageId = AF.stageIdOf(actor)
          const actorInterval = AF.intervalOf(actor)

          if ((interval) % actorInterval === 0) {
            const maybeDoors = DF.maybeDoorsForStage(stages)(stageId)
            const maybeNewStageId = DF.getRandomWayOut(maybeDoors)
            const actorId = AF.idOf(actor)

            return changeActorStage(actorId, S.maybeToNullable(
              maybeNewStageId))
          } else {
            return nothingChange()
          }
        }

        const actors = appStore.getState()
          .actors
        const stages = appStore.getState()
          .stages
        const actions = S.map((a: Actor) => getChangeStageAction(stages, a))(
          actors)

        return actions
      })
    )

export {
  getActorsStream
}
