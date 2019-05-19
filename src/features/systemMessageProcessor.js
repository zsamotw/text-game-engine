const Rx = require('rxjs')
const { map } = require('rxjs/operators')
const R = require('ramda')
const HF = require('../features/helperFunctions')

const getSystemMessagesStream = (messages) => Rx.interval(10000).pipe(map(val => messages[HF.getRandomInt(messages.length)]))
const getSystemMessagesFromState = R.compose(getSystemMessagesStream, HF.getSystemMessages)

module.exports = {
  getSystemMessagesFromState: getSystemMessagesFromState
}
