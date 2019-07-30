import {
  Action,
} from '../../models/action'
import {
  NOTHING_CHANGE,
} from './action-types'

const nothingChange = () => {
  return {
    type: NOTHING_CHANGE
  } as Action
}

export {
    nothingChange
}