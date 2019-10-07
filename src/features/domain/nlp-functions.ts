import * as N from 'natural'
import * as S from 'sanctuary'

const pairWithDistance = (string: string, other: string) => {
  return { value: string, distance: N.JaroWinklerDistance(string, other) }
}

const greaterThen = (pair: any) => (minDistance: number) =>
  S.gt(minDistance)(S.prop('distance')(pair))

const bestMatches = (str: string) => (strings: string[]) => (
  minDistance: number
) => {
  return S.pipe([
    S.map((s: string) => pairWithDistance(s, str)),
    S.sortBy(S.prop('distance')),
    S.reverse,
    S.filter(pair => greaterThen(pair)(minDistance)),
    S.map(S.prop('value'))
  ])(strings)
}

export { bestMatches }
