import * as DF from '../../../features/domain/door-functions'

test('Check doors', () => {
    expect(DF.openedDoors({north: 1, south: 2, west: 3, east: undefined})).toEqual([1,2,3])
})
test('Get Way Out', () => {
    expect(DF.getWayOut({north: 1, south: 2, west: 3, east: undefined})).toBeDefined()
})