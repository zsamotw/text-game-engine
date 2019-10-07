import * as NLP from '../../../features/domain/nlp-functions'
import * as S from 'sanctuary'

it('', () => {
  const str = 'foo'
  const strings = ['oo', 'hh', 'v', 'fo']
  const expected = ['fo', 'oo']
  expect(NLP.bestMatches(str)(strings)(0.5)).toEqual(expected)
})
