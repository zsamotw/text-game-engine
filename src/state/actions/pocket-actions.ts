import { PUT_ELEM_INTO_POCKET, TAKE_ELEM_FROM_POCKET } from './action-types'
import Elem from '../../models/elem'
import { ElemAction } from '../../models/action'

const putElemInToPocket = (elem: Elem) => {
  return {
    type: PUT_ELEM_INTO_POCKET,
    elem: elem
  } as ElemAction
}

const takeElemFromPocket = (elem: Elem) => {
  return {
    type: TAKE_ELEM_FROM_POCKET,
    elem: elem
  } as ElemAction
}

export { putElemInToPocket, takeElemFromPocket }
