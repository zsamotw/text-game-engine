import * as L from '../utils/lenses'
import * as R from 'ramda'
import Element from '../../models/element'
import State from '../../models/state'
import Stage from '../../models/stage'
import * as S from 'sanctuary'

const getRandomInt = (max: number) =>
  Math.floor(Math.random() * Math.floor(max))

const getOnlyWithValues = (iterable: any[]) =>
  S.filter((el) => el  !== null || el !== undefined)(iterable)

const nameOf: (element: Element) => string = R.view(L.nameLens)

const descriptionOf: (state: State | Stage | Element) => string = R.view(
  L.descriptionLens
)

export {
  getRandomInt,
  getOnlyWithValues as mapToValues,
  nameOf,
  descriptionOf
}
