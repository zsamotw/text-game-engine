import { PUT_ELEMENT_INTO_POCKET, TAKE_ELEMENT_FROM_POCKET } from './action-types'
import Element from '../../models/element'
import { ElementAction } from '../../models/action'

const putElementInToPocket = (element: Element) => {
  return {
    type: PUT_ELEMENT_INTO_POCKET,
    element: element
  } as ElementAction
}

const takeElementFromPocket = (element: Element) => {
  return {
    type: TAKE_ELEMENT_FROM_POCKET,
    element: element
  } as ElementAction
}

export { putElementInToPocket, takeElementFromPocket }
