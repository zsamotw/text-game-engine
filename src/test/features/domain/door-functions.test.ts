import * as DF from '../../../features/domain/door-functions'
import * as S from 'sanctuary'
import Stage from '../../../models/stage'

//TODO fix tests
it('Should return Just doors for Just stage', () => {
    const doors = {north: S.Just(1), south: S.Just(2), west: S.Just(3), east: S.Nothing}
    const justStage = S.Just({id: 1, doors } as Stage)
    const expected = S.Just(doors)
    expect(DF.maybeDoorsOf(justStage)).toEqual(expected)
})

it('Should return Nothing when stage is Nothing', () => {
    const nothing = S.Nothing
    const expected = S.Nothing
    expect(DF.maybeDoorsOf(nothing)).toEqual(expected)
})

it('Should return Just of list of numbers with ids for just doors with just ids', () => {
    const justDoors = S.Just({north: S.Just(1), south: S.Just(2), west: S.Just(3), east: S.Nothing})
    const expected = S.Just([1,2,3])
    expect(DF.openedDoors(justDoors)).toEqual(expected)
})

it('Should return Just of empty list for just doors with Nothings', () => {
    const justDoors = S.Just({north: S.Nothing, south: S.Nothing, west: S.Nothing, east: S.Nothing})
    const expected = S.Just([])
    expect(DF.openedDoors(justDoors)).toEqual(expected)
})

it('Should return Nothing for Nothing of doors', () => {
    const nothing = S.Nothing
    const expected = S.Nothing
    expect(DF.openedDoors(nothing)).toEqual(expected)
})

it('Should return  defined id of stage', () => {
    const justDoors = S.Just({north: S.Just(1), south: S.Just(2), west: S.Just(3), east: S.Nothing})
    expect(DF.getRandomWayOut(justDoors)).toBeDefined()
})

it('Should return Just of numbers for stages with defined id', () => {
    const doors = {north: S.Just(1), south: S.Just(2), west: S.Just(3), east: S.Nothing}
    const stage = {id: 1, doors}
    const stages = [stage]
    const expected = S.Just([1,2,3])
    expect(DF.openedDoorsForStage(stages as Stage[])(1)).toEqual(expected)
})

it('Should return Nothing when stage id not found', () => {
    const doors = {north: S.Just(1), south: S.Just(2), west: S.Just(3), east: S.Nothing}
    const stage = {id: 1, doors}
    const stages = [stage]
    const expected = S.Nothing
    expect(DF.openedDoorsForStage(stages as Stage[])(2)).toEqual(expected)
})