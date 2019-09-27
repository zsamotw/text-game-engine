import * as S from 'sanctuary'
import * as P from '../utils/patterns'

const isLookPattern = (str: string) => S.test(P.lookPattern)(str)
const isLookAtPattern = (str: string) => S.test(P.lookAtPattern)(str)
const isGoPattern = (str: string) => S.test(P.goPattern)(str)
const isTakePattern = (str: string) => S.test(P.takePattern)(str)
const isPutPattern = (str: string) => S.test(P.putPattern)(str)
const isPocketPattern = (str: string) => S.test(P.pocketPattern)(str)
const isTalkPattern = (str: string) => S.test(P.talkToPattern)(str)
// const isTalkWithPattern = (str: string) => S.test(P.talkWithPattern)(str)

export {
  isLookAtPattern,
  isLookPattern,
  isGoPattern,
  isTakePattern,
  isPutPattern,
  isPocketPattern,
  isTalkPattern,
  // isTalkWithPattern
}
