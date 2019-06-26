import * as L from '../utils/lenses'
import * as R from 'ramda'
import Elem from '../../models/elem'
import State from '../../models/state'

const getRandomInt = (max: number) =>
  Math.floor(Math.random() * Math.floor(max))

const mapToValues = (iterable: any[]) => R.filter(i => !R.isNil(i), iterable)

const updateIterable = (
  iterable: any[],
  id: number,
  propName: string,
  newValue: any
) =>
  R.map(
    elem => (elem.id === id ? R.assoc(propName, newValue, elem) : elem),
    iterable
  )

const nameOf: (elem: Elem) => string = R.view(L.nameLens)

const descriptionOf: (state: State) => string = R.view(L.descriptionLens)

export { getRandomInt, mapToValues, updateIterable, nameOf, descriptionOf }
