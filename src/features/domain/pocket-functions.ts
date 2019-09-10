import * as R from 'ramda'
import Element from '../../models/element'
import { settings } from '../../state/initial-state'

const { maxPocketSize } = settings

const isPlaceInPocket: (pocket: Element[]) => boolean = pocket =>
  R.lt(pocket.length, maxPocketSize)

const addElementTo = (element: Element, pocket: Element[]) =>
  R.append(element, pocket)

export { addElementTo, isPlaceInPocket, maxPocketSize }
