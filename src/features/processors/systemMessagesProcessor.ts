import { map } from 'rxjs/operators'
import * as GH from '../helpers/genericHelper.js'
import * as MF from '../domain/messagesFunctions'
import * as R from 'ramda'
import * as Rx from 'rxjs'

const getSystemMessages = (messages: string[]) =>
  Rx.interval(10000).pipe(
    map(val => messages[GH.getRandomInt(messages.length)])
  )

const getSystemMessagesStream = R.compose(
  getSystemMessages,
  MF.getSystemMessages
)

export { getSystemMessagesStream }
