const R = require('ramda')

const getRestOfCommand = command => R.prop('rest', command)

const nameEq = name => R.propEq('name', name)

const restCommandEqName = R.compose(
  nameEq,
  getRestOfCommand
)

const getElemEqualsToCommand = (command, elems) =>
  R.find(restCommandEqName(command), elems)

module.exports = {
  restCommandEqName,
  getElemEqualsToCommand
}
