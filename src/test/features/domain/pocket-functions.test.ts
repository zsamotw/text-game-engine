
import * as PF from '../../../features/domain/pocket-functions'
import Element from '../../../models/element'
const { size } = require('sanctuary')

it('Should return true if is enough place in pocket', () => {
    const pocket = [{name: 'foo' } as Element, {name: 'bar'} as Element]
    expect(PF.isPlaceInPocket(pocket)).toBeTruthy
})

it('Should return false when pocket is full', () => {
    const pocket = [{name: 'foo' } as Element, {name: 'bar'} as Element, {name: 'baz'} as Element]
    expect(PF.isPlaceInPocket(pocket)).toBeFalsy
})

it('Should return add element to pocket', () => {
    const pocket = [{name: 'foo' } as Element, {name: 'bar'} as Element, {name: 'baz'} as Element]
    const element = {name: 'bazz'} as Element
    const expected = size(pocket) + 1
    const pocketAfter = PF.addElementTo(element, pocket)
    expect(size(pocketAfter)).toEqual(expected)
})