import Stage from './stage'
import Actor from './actor'
import Element from './element'

export default interface State {
  stages: Stage[]
  currentStageId: number
  pocket: Element[]
  actors: Actor[]
  messages: string[]
}
