import * as GH from '../helpers/genericHelper'
import * as L from '../utils/lenses'
import * as R from 'ramda'
import * as SF from './stagesFunctions'
import State from '../../models/state'
import Elem from '../../models/elem'
import not from 'ramda/es/not'

const maxPocketSize = 2

const viewPocket = R.view(L.pocketLens) as (state: State) => Elem[]

const isPlaceInPocket = (state: State) =>
  viewPocket(state).length < maxPocketSize

const addElemToPocket = (elem: Elem, state: State) => {
  const elemsInCurrentStage = SF.getElemsForCurrentStage(state)
  const elemsAfterTakeElem = elemsInCurrentStage.filter(
    e => e.name !== GH.nameOf(elem)
  )

  const stagesAfterTakeElem = GH.updateIterable(
    SF.viewStages(state),
    SF.viewCurrentStageId(state),
    'elems',
    elemsAfterTakeElem
  )

  const pocket = viewPocket(state)
  const addElemTo = R.append(elem)

  const swapElemFromStageToPocket = (state: State) => {
    const stateAfterTakeElemFromStage = R.set(
      L.stagesLens,
      stagesAfterTakeElem,
      state
    )
    const stateAfterPutElemInPocket = R.set(
      L.pocketLens,
      addElemTo(pocket),
      stateAfterTakeElemFromStage
    )
    return stateAfterPutElemInPocket
  }

  return swapElemFromStageToPocket(state)
}

const putElemToStage: (elem: Elem, state: State) => State = (elem, state) => {
  const addElemToElemsInCurrentStage = R.compose(
    R.append(elem),
    SF.getElemsForCurrentStage
  )

  const stagesAfterPutElem = GH.updateIterable(
    SF.viewStages(state),
    SF.viewCurrentStageId(state),
    'elems',
    addElemToElemsInCurrentStage(state)
  )

  const pocket = viewPocket(state)
  const takeElemFrom = R.reject(R.propEq('name')(GH.nameOf(elem)))

  const swapElemFromPocketToStage = (state: State) => {
    const stateAfterPutElemInStage = R.set(
      L.stagesLens,
      stagesAfterPutElem,
      state
    )
    const stateAfterTakeElemFromPocket = R.set(
      L.pocketLens,
      takeElemFrom(pocket),
      stateAfterPutElemInStage
    )
    return stateAfterTakeElemFromPocket
  }

  return swapElemFromPocketToStage(state)
}

export {
  viewPocket,
  isPlaceInPocket,
  maxPocketSize,
  addElemToPocket,
  putElemToStage
}
