import * as L from '../utils/lenses'
import * as R from 'ramda'
import Command from '../../models/command'
import Elem from '../../models/elem';

const getRestOfCommand = (command: Command) => R.view(L.restLens, command) as string

const nameEq = (name: string) => R.propEq('name', name)

const restCommandEqName = R.compose(
  nameEq,
  getRestOfCommand
)

const getElemEqualsToCommand = R.curry(
  (command: Command, elems: Elem[]) =>
    R.find(restCommandEqName(command), elems)
)

export {
  restCommandEqName,
  getElemEqualsToCommand
}
