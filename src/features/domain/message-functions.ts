import R from 'ramda'
import * as L from '../utils/lenses'
import State from '../../models/state'

const systemMessagesOf: (state: State) => string[] = R.view(L.systemMessages)

export { systemMessagesOf }
