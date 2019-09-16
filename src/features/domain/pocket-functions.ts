import * as S from 'sanctuary'
import Element from '../../models/element'
import { settings } from '../../state/initial-state'
const { size } = require('sanctuary')

const { maxPocketSize } = settings

const isPlaceInPocket: (pocket: Element[]) => boolean = pocket =>
  S.lte(maxPocketSize)(pocket.length)

const addElementTo = (element: Element, pocket: Element[]) =>
  S.append(element)(pocket)

export { addElementTo, isPlaceInPocket, maxPocketSize }
