import * as GH from '../helpers/genericHelper'
import * as L from '../utils/lenses'
import * as R from 'ramda'
import * as SF from './stageFunctions'
import State from '../../models/state'
import Elem from '../../models/elem'

const maxPocketSize = 2

const getPocket: (state: State) => Elem[] = R.view(L.pocketLens)

const isPlaceInPocket: (state: State) => boolean = state =>
  getPocket(state).length < maxPocketSize

const addElemToPocket: (
  elem: Elem,
  state: State
) => { state: State; elem: Elem } = (elem, state) => {
  const pocket = getPocket(state)
  const addElemTo = R.append(elem)
  const stateAfterPutElemInPocket = R.set(
    L.pocketLens,
    addElemTo(pocket),
    state
  )

  return { state: stateAfterPutElemInPocket, elem: elem }
}

const removeElemFromStage: (elemAndState: {
  elem: Elem
  state: State
}) => State = elemAndstate => {
  const { elem, state } = elemAndstate
  const elemsInCurrentStage = SF.getElemsForCurrentStage(state)
  const elemsAfterTakeElem = elemsInCurrentStage.filter(
    e => e.name !== GH.nameOf(elem)
  )

  const stagesAfterTakeElem = GH.updateIterable(
    SF.getStages(state),
    SF.getCurrentStageId(state),
    'elems',
    elemsAfterTakeElem
  )
  const stateAfterTakeElemFromStage = R.set(
    L.stagesLens,
    stagesAfterTakeElem,
    state
  )

  return stateAfterTakeElemFromStage
}

const putElemToStage: (elem: Elem, state: State) => State = (elem, state) => {
  const addElemToElemsInCurrentStage = R.compose(
    R.append(elem),
    SF.getElemsForCurrentStage
  )

  const stagesAfterPutElem = GH.updateIterable(
    SF.getStages(state),
    SF.getCurrentStageId(state),
    'elems',
    addElemToElemsInCurrentStage(state)
  )

  const pocket = getPocket(state)
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
  getPocket,
  isPlaceInPocket,
  maxPocketSize,
  addElemToPocket,
  removeElemFromStage,
  putElemToStage
}
