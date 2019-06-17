const R = require('ramda')

const getRandomInt = max => Math.floor(Math.random() * Math.floor(max))

const mapToValues = iterable => R.filter(i => !R.isNil(i), iterable)

const changePropertyOfIterable = (iterable, id, propName, newValue) =>
  R.map(elem => elem.id === id ? R.assoc(propName, newValue, elem) : elem, iterable)

module.exports = {
  getRandomInt,
  mapToValues,
  changePropertyOfIterable
}
