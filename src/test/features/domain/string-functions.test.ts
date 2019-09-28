import * as SF from '../../../features/domain/string-functions'

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