import Elem from './elem'
import Doors from './doors'

export default interface Stage {
  id: number
  name: string
  description: string
  elems: Elem[]
  doors: Doors
}
