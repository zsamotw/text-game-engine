// processCommand :: Command -> State -> (State, message)
//
const R = require('ramda')

const state = {stages: [{description: 'ula', id: 1, elems: [{name: 'hola', description: 'hola description'}]}, {description: 'ala', id: 2}], currentStageId: 1}

const getLookState = function(command, state) {
  const stageDescription = R.find(R.propEq('id', state.currentStageId), state.stages).description
  return {state: state, message: stageDescription}
}

const getLookAtState = function(command, state) {
  const elems = R.find(R.propEq('id', state.currentStageId), state.stages).elems
  const elemDescription = R.find(R.propEq('name', command.rest), elems).description
  return R.ifElse(
    R.isNil(elemDescription),
    { state: state, message: 'No such elem on stage' },
    { state: state, message: elemDescription }
  )
}

const processCommand = R.cond([
  [(command, state) => R.equals(R.prop('command', command), 'look'), (command, state) => getLookState(command, state)],
  [R.T, (state, command) => 'oooops wrong command']
])

//test =>
const res = processCommand({command: 'look', rest: 'hola'}, state)
console.log(res)
