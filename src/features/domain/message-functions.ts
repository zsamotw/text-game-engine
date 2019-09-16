import * as L from '../utils/lenses'
import State from '../../models/state'

const systemMessagesOf: (state: State) => string[] = L.stateSystemMessagesLens.get()

export { systemMessagesOf }
