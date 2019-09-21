import * as L from '../utils/lenses'
import * as S from 'sanctuary'
import Command from '../../models/command'
import Element from '../../models/element'

const isNameEqual = S.curry2((name: string, object: any) => {
  const nameFromObject = S.prop('name')(object)
  return S.equals(nameFromObject)(name)
})

//public api
const restOfCommand: (command: Command) => string = L.commandRestLens.get()

const isRestOfCommandEqualsToNameOf = S.compose(isNameEqual)(L.commandRestLens.get())

const elementEqualsToCommand = S.curry2(
  (command: Command, elements: Element[]) => {
    const isElementNameSameAsInCommand = isRestOfCommandEqualsToNameOf(command)
    return S.find(isElementNameSameAsInCommand)(elements)
  }
)

export {
  restOfCommand,
  isRestOfCommandEqualsToNameOf,
  elementEqualsToCommand
}
