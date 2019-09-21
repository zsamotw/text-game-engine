import * as S from 'sanctuary'

const getRandomInt = (max: number) =>
  Math.floor(Math.random() * Math.floor(max))

const getOnlyWithValues = (iterable: any[]) =>
  S.filter((el) => el  !== null || el !== undefined)(iterable)

export {
  getRandomInt,
  getOnlyWithValues as mapToValues,
}
