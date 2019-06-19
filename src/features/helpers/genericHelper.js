const R = require('ramda')
const L = require('../utils/lenses')

const getRandomInt = max => Math.floor(Math.random() * Math.floor(max))

const mapToValues = iterable => R.filter(i => !R.isNil(i), iterable)

const updateIterable = (iterable, id, propName, newValue) =>
  R.map(elem => elem.id === id ? R.assoc(propName, newValue, elem) : elem, iterable)

const nameOf = R.view(L.nameLens)

const notEqualNameTo = R.complement(R.propEq('name'))

const descriptionOf = R.view(L.descriptionLens)

module.exports = {
  getRandomInt,
  mapToValues,
  updateIterable,
  nameOf,
  notEqualNameTo,
  descriptionOf
}
