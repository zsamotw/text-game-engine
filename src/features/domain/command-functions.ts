import * as L from '../utils/lenses'
import * as R from 'ramda'
import Command from '../../models/command'
import Element from '../../models/element'

const restOfCommand: (command: Command) => string = R.view(L.restLens)

const isNameEqual: (name: string) => (object: any) => boolean = R.propEq('name')

const isRestOfCommandEqualsToNameOf = R.compose(
  isNameEqual,
  restOfCommand
)

const elementEqualsToCommand = R.curry((command: Command, elements: Element[]) =>
  R.find(isRestOfCommandEqualsToNameOf(command))(elements)
)

export { restOfCommand, isRestOfCommandEqualsToNameOf, elementEqualsToCommand }
