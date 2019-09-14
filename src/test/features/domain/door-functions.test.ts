import * as DF from '../../../features/domain/door-functions'

test('Opened doors should be equals to expected', () => {
    const expected = [1,2,3]
    expect(DF.openedDoors({north: 1, south: 2, west: 3, east: undefined})).toEqual(expected)
})

test('Opened doors should be defined', () => {
    expect(DF.getWayOut({north: 1, south: 2, west: 3, east: undefined})).toBeDefined()
})