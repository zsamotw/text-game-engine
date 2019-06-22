const Rx = require('rxjs')
const { map } = require('rxjs/operators')
const R = require('ramda')
const L = require('../utils/lenses')
const DF = require('../domain/doorFunctions')
const GH = require('../helpers/genericHelper')

const getActorsStream = state =>
  Rx.interval(3000).pipe(
    map(interval => {
      const processActors = (state, actor) => {
        if ((interval * 1000) % actor.interval === 0) {
          const doors = DF.getOpenedDoorsForStage(actor.stageId, state)
          const newStageId = DF.getWayOut(doors)
          const actors = R.clone(R.view(L.actorsLens, state))
          const newActors = GH.updateIterable(
            actors,
            actor.id,
            'stageId',
            newStageId
          )
          return R.set(L.actorsLens, newActors, state)
        } else {
          return R.clone(state)
        }
      }

      const actors = R.view(L.actorsLens, state)
      console.log('before reduce')
      const newState = R.reduce(processActors, R.clone(state), R.clone(actors))
      return newState
    })
  )

module.exports = {
  getActorsStream
}
