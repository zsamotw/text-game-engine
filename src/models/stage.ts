import Element from './element'
import Doors from './doors'

export default interface Stage {
  id: number
  name: string
  description: string
  elements: Element[]
  doors: Doors
}
