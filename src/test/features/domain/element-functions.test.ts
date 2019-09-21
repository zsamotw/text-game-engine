import * as EF from '../../../features/domain/elements-functions'
import Element from '../../../models/element'
import Stage from '../../../models/stage'

it('Should return elements for existing stage', () => {
    const elements = [{name: 'foo' } as Element, {name: 'bar'} as Element]
    const stage = {id: 1, elements } as Stage
    const stages = [stage]
    const expected = [{name: 'foo' } as Element, {name: 'bar'} as Element]
    expect(EF.elementsFrom(1)(stages)).toEqual(expected)
})

it('Should return elements for not existing stage', () => {
    const elements = [{name: 'foo' } as Element, {name: 'bar'} as Element]
    const stage = {id: 1, elements } as Stage
    const stages = [stage]
    const expected = [] as Element[]
    expect(EF.elementsFrom(2)(stages)).toEqual(expected)
})
