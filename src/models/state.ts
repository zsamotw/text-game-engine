import Stage from './stage'
import Actor from './actor'
import Elem from './elem'

export default interface State {
  stages: Stage[]
  currentStageId: number
  pocket: Elem[]
  actors: Actor[]
  systemMessages: string[]
}
