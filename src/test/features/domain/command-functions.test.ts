import * as CF from '../../../features/domain/command-functions'
import Element from '../../../models/element'
import * as S from 'sanctuary'

test('Rest of command should be same as in object Command', () => {
  const command = { order: 'order', rest: 'foo' }
  const expected = 'foo'
  expect(CF.restOfCommand(command)).toEqual(expected)
})

test('Rest of command should be empty string', () => {
  const command = { order: 'order', rest: '' }
  const expected = ''
  expect(CF.restOfCommand(command)).toEqual(expected)
})

test('Rest of command should be equals to name of object', () => {
  const name = 'foo'
  const command = { order: 'order', rest: name }
  const object = { name }
  expect(CF.isRestOfCommandEqualsToNameOf(command)(object)).toBeTruthy
})

test('Rest of command should be not equals to name of object', () => {
  const command = { order: 'order', rest: 'foo' }
  const name = 'bar'
  const object = { name }
  expect(CF.isRestOfCommandEqualsToNameOf(command)(object)).toBeFalsy
})

test('ElementsEqualToCommand should return Just of element when array contains element', () => {
  const name = 'foo'
  const command = { order: 'order', rest: name }
  const elements = [{ name }, { name: 'bar' }, { name: 'baz' }] as Element[]
  const expected = S.Just({ name })
  expect(CF.elementEqualsToCommand(command)(elements)).toEqual(
    expected
  )
})

test('ElementsEqualToCommand should return Nothing when array not contain element', () => {
  const name = 'foo'
  const command = { order: 'order', rest: name }
  const elements = [{ name: 'bar' }, { name: 'baz' }] as Element[]
  const expected = S.Nothing
  expect(CF.elementEqualsToCommand(command)(elements)).toEqual(
    expected
  )
})