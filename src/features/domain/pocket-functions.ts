import * as R from 'ramda'
import Elem from '../../models/elem'

const maxPocketSize = 2

const isPlaceInPocket: (pocket: Elem[]) => boolean = pocket =>
  pocket.length < maxPocketSize

const addElemTo = (elem: Elem, pocket: Elem[]) => R.append(elem, pocket)

export { addElemTo, isPlaceInPocket, maxPocketSize }
