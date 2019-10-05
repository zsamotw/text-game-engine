import * as SF from '../../../features/domain/string-functions'
import * as S from 'sanctuary'
import * as P from '../../../features/utils/patterns'

it('Should return true while compare two strings with same letters but with different cases', () => {
  const str1 = 'foo'
  const str2 = 'Foo'
  expect(SF.equalsIgnoreCase(str1)(str2)).toBeTruthy()
})

it('Should return false while compare two different strings', () => {
  const str1 = 'foo'
  const str2 = 'bar'
  expect(SF.equalsIgnoreCase(str1)(str2)).toBeFalsy()
})

it('Should return Just string array after split and get tail of the list', () => {
  const str = 'foobar'
  const pattern = /foo/g
  const expected = S.Just(['bar'])
  expect(SF.maybeSplitTail(pattern)(str)).toEqual(expected)
})

it('Should return Just of array of empty string after split and get tail of the list', () => {
  const str = 'foo'
  const pattern = /foo/g
  const expected = S.Just([''])
  expect(SF.maybeSplitTail(pattern)(str)).toEqual(expected)
})

it('Should return Just of empty array after split and get tail of the list', () => {
  const str = 'fo'
  const pattern = /foo/g
  const expected = S.Just([])
  expect(SF.maybeSplitTail(pattern)(str)).toEqual(expected)
})

it('Should return Nothing for empty string in array', () => {
  const justStringArray = S.Just([''])
  const expected = S.Nothing
  expect(SF.maybeString(justStringArray)).toEqual(expected)
})

it('Should return Nothing for empty array', () => {
  const justStringArray = S.Just([])
  const expected = S.Nothing
  expect(SF.maybeString(justStringArray)).toEqual(expected)
})

it('Should return Just for string in array', () => {
  const justStringArray = S.Just(['foo'])
  const expected = S.Just('foo')
  expect(SF.maybeString(justStringArray)).toEqual(expected)
})

it('Should return proper string after split with pattern', () => {
  const str = 'look at foo'
  const pattern = P.lookAtPatternGlobal
  const expected = 'foo'
  expect(SF.splitAndTakeRest(pattern)(str)).toEqual(expected)
})

it('Should return empty string after split with pattern', () => {
  const str = 'look at'
  const pattern = P.lookAtPatternGlobal
  const expected = ''
  expect(SF.splitAndTakeRest(pattern)(str)).toEqual(expected)
})

it('Should return empty string after split string with unmatchable pattern', () => {
  const str = 'mio mio'
  const pattern = P.lookAtPatternGlobal
  const expected = ''
  expect(SF.splitAndTakeRest(pattern)(str)).toEqual(expected)
})
