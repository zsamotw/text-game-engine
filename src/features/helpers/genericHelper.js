const R = require('ramda')

const getRandomInt = max => Math.floor(Math.random() * Math.floor(max))

const mapToValues = iterable => {
  return R.filter(elem => elem !== undefined && elem !== null, iterable)
}

const changePropertyOfIterable = (iterable, id, propName, newValue) => {
  return R.map(elem => {
    if (elem.id === id) {
      return R.assoc(propName, newValue, elem)
    } else {
      return elem
    }
  }, iterable)
}

module.exports = {
  getRandomInt,
  mapToValues,
  changePropertyOfIterable
}
