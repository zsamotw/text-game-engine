import * as DF from '../../../features/domain/door-functions'
import * as S from 'sanctuary'
import Stage from '../../../models/stage'

test('Opened doors should be equals to expected', () => {
    const doors = {north: S.Just(1), south: S.Just(2), west: S.Just(3), east: S.Nothing}
    const expected = S.Just([1,2,3])
    expect(DF.openedDoors(doors)).toEqual(expected)
})

test('Opened doors should be equals to Just empty array', () => {
    const doors = {north: S.Nothing, south: S.Nothing, west: S.Nothing, east: S.Nothing}
    const expected = S.Just([])
    expect(DF.openedDoors(doors)).toEqual(expected)
})

test('Opened doors should be defined', () => {
    const doors = {north: S.Just(1), south: S.Just(2), west: S.Just(3), east: S.Nothing}
    expect(DF.getRandomWayOut(doors)).toBeDefined()
})

test('Opened doors for stage of id should be as expected', () => {
    const doors = {north: S.Just(1), south: S.Just(2), west: S.Just(3), east: S.Nothing}
    const stage = {id: 1, doors}
    const stages = [stage]
    const expected = S.Just([1,2,3])
    expect(DF.openedDoorsForStage(stages as Stage[])(1)).toEqual(expected)
})