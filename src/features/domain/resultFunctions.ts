import * as R from 'ramda'
import * as L from '../utils/lenses'
import Result from '../../models/result'
import Elem from '../../models/elem'

const getType: (result: Result) => string = R.view(L.typeLens)

const getMessage: (result: Result) => string = R.view(L.messageLens)

const getNextStatgeId: (result: Result) => number = R.view(L.nextStageId)

const getElem: (result: Result) => Elem = R.view(L.elemLens)

export { getType, getMessage, getNextStatgeId, getElem }
