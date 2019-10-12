import Stage from './stage'
import Actor from './actor'
import Element from './element'
import Settings from './settings'

export default interface State {
  stages: Stage[]
  currentStageId: number
  pocket: Element[]
  actors: Actor[]
  messages: string[]
  settings: Settings
}
