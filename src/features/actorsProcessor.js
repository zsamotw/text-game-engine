const Rx = require('rxjs')
const { map } = require('rxjs/operators')
const R = require('ramda')
const SF = require('../features/stateFunctions')
const L = require('./lenses')

const getActorsStream = state =>
  Rx.interval(3000).pipe(
    map(interval => {
      const processActors = (state, actor) => {
        if ((interval * 1000) % actor.interval === 0) {
          const doors = SF.getOpenedDoorsForStage(actor.stage, state)
          const newStageId = SF.getWayOut(doors)
          const actors = R.clone(R.view(L.stateActorsLens, state))
          const newActors = SF.changePropertyOfIterable(
            actors,
            actor.id,
            'stage',
            newStageId
          )
          return R.set(L.stateActorsLens, newActors, state)
        } else {
          return R.clone(state)
        }
      }

      const actors = R.view(L.stateActorsLens, state)
      const newState = R.reduce(processActors, R.clone(state), R.clone(actors))
      return newState
    })
  )

module.exports = {
  getActorsStream
}
