import R from 'ramda'
import * as L from '../utils/lenses'
import State from '../../models/state'

const getSystemMessages: (state: State) => string[] = state =>
  R.view(L.systemMessages, state)

export { getSystemMessages }
