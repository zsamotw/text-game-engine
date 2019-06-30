import * as L from '../utils/lenses'
import * as R from 'ramda'
import Command from '../../models/command'
import Elem from '../../models/elem'

const getRestOfCommand: (command: Command) => string = R.view(L.restLens)

const isNameEqual: (name: string) => (object: any) => boolean = R.propEq('name')

const isRestCommandEqualToNameOf = R.compose(
  isNameEqual,
  getRestOfCommand
)

const getElemEqualsToCommand = R.curry((command: Command, elems: Elem[]) =>
  R.find(isRestCommandEqualToNameOf(command), elems)
)

export { isRestCommandEqualToNameOf, getElemEqualsToCommand }
