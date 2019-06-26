import R from 'ramda';
import * as L from '../utils/lenses'
import State from '../../models/state';

const getSystemMessages = (state: State) => R.view(L.systemMessages, state)

export {
  getSystemMessages
}
