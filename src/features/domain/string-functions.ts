import * as S from 'sanctuary'
import { match } from 'minta'
import { Maybe } from '../../features/utils/types'
const $ = require('sanctuary-def')

const equalsIgnoreCase = (str1: string) => (str2: string) => {
  return S.equals(S.toLower(str1))(S.toLower(str2))
}

const maybeSplitTail = (pattern: RegExp) => {
  const split = S.splitOnRegex(pattern)
  return S.pipe([split, S.tail])
}

const maybeString = (maybeStringArray: Maybe<string[]>) => {
  return match(maybeStringArray)(
    S.equals(S.Just([]))(maybeStringArray),
    () => S.Nothing,
    S.equals(S.Just(['']))(maybeStringArray),
    () => S.Nothing,
    S.is($.Maybe($.Array($.String)))(maybeStringArray),
    () => S.join(S.map((xs: string[]) => S.head(xs))(maybeStringArray)),
    otherwise => S.Nothing
  )
}

const getStringFromMaybe = S.ifElse(S.isNothing)(() => '')(maybeString =>
  S.maybeToNullable(maybeString)
)

const splitAndTakeRest = (pattern: RegExp) => {
  const split = maybeSplitTail(pattern)
  return S.pipe([split, maybeString, getStringFromMaybe, S.trim])
}

const getHead = S.chain((xs: string[]) => S.head(xs))

export {
  equalsIgnoreCase,
  maybeSplitTail,
  maybeString,
  splitAndTakeRest,
  getStringFromMaybe
}
