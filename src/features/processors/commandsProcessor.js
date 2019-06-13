const R = require('ramda')
const RH = require('../helpers/resultHelper')

// processCommandAndGetResult :: String -> State -> Result
const processCommandAndGetResult = R.cond([
  [(command, state) => R.equals(R.prop('order', command), 'Look'), (command, state) => RH.getLookResult(state)],
  [(command, state) => R.equals(R.prop('order', command), 'LookAt'), (command, state) => RH.getLookAtResult(command, state)],
  [(command, state) => R.equals(R.prop('order', command), 'Go'), (command, state) => RH.getGoResult(command, state)],
  [(command, state) => R.equals(R.prop('order', command), 'Take'), (command, state) => RH.getTakeResult(command, state)],
  [(command, state) => R.equals(R.prop('order', command), 'Put'), (command, state) => RH.getPutResult(command, state)],
  [(command, state) => R.equals(R.prop('order', command), 'Pocket'), (command, state) => RH.getPocketResult(command, state)],
  [(command, state) => R.equals(R.prop('order', command), 'Undefined'), (command, state) => RH.getUndefinedResult(command, state)],
  [R.T, (command, state) => 'Errorrrr!!!']
])

module.exports = {
  processCommandAndGetResult
}
