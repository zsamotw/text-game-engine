import Stage from '../../models/stage'
import * as SF from './stage-functions'
import * as L from '../utils/lenses'

const elementsFrom = (i: number) => (stages: Stage[]) => {
  const stage = SF.stageFrom(stages)(i)
  L.stageElementsLens.get()(stage)
}

export {
  elementsFrom
}
