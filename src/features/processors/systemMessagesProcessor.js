const { map } = require('rxjs/operators')
const GH = require('../helpers/genericHelper.js')
const MF = require('../domain/messagesFunctions')
const R = require('ramda')
const Rx = require('rxjs')

const getSystemMessages = messages =>
  Rx.interval(10000).pipe(
    map(val => messages[GH.getRandomInt(messages.length)])
  )

const getSystemMessagesStream = R.compose(
  getSystemMessages,
  MF.getSystemMessages
)

module.exports = {
  getSystemMessagesStream
}
