const R = require('ramda')
const L = require('../elements/lenses')

const getRandomInt = max => Math.floor(Math.random() * Math.floor(max))

const mapToValues = iterable => R.filter(i => !R.isNil(i), iterable)

const changePropertyOfIterable = (iterable, id, propName, newValue) =>
  R.map(elem => elem.id === id ? R.assoc(propName, newValue, elem) : elem, iterable)

const nameOf = R.view(L.nameLens)

const descriptionOf = R.view(L.descriptionLens)

module.exports = {
  getRandomInt,
  mapToValues,
  changePropertyOfIterable,
  nameOf,
  descriptionOf
}
