import * as L from '../utils/lenses'
import * as R from 'ramda'
import Command from '../../models/command'
import Element from '../../models/element'

const getRestOfCommand: (command: Command) => string = R.view(L.restLens)

const isNameEqual: (name: string) => (object: any) => boolean = R.propEq('name')

const isRestCommandEqualToNameOf = R.compose(
  isNameEqual,
  getRestOfCommand
)

const getElementEqualsToCommand = R.curry((command: Command, elements: Element[]) =>
  R.find(isRestCommandEqualToNameOf(command), elements)
)

export { getRestOfCommand, isRestCommandEqualToNameOf, getElementEqualsToCommand }
