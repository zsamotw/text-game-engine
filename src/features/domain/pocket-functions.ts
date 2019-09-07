import * as R from 'ramda'
import Element from '../../models/element'

const maxPocketSize = 2

const isPlaceInPocket: (pocket: Element[]) => boolean = pocket =>
  pocket.length < maxPocketSize

const addElementTo = (element: Element, pocket: Element[]) => R.append(element, pocket)

export { addElementTo, isPlaceInPocket, maxPocketSize }
