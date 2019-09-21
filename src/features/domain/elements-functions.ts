import Stage from '../../models/stage'
import Element from '../../models/element'
import * as SF from './stage-functions'
import * as L from '../utils/lenses'
import * as S from 'sanctuary'

const elementsFrom = (i: number) => (stages: Stage[]) => {
  const maybeStage = SF.maybeStage(stages)(i)
  if (S.isNothing(maybeStage))
    return []
  else {
    const stage = S.maybeToNullable(maybeStage) as Stage
    return L.stageElementsLens.get()(stage)
  }
}

const nameOf: (element: Element) => string = L.elementNameLens.get()

const descriptionOf: (element: Element) => string = L.elementDescriptionLens.get()

export {
  elementsFrom,
  nameOf,
  descriptionOf
}
