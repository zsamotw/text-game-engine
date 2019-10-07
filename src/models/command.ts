import { CommandOrder } from '../features/utils/command-order'
export default interface Command {
  order: CommandOrder
  rest: string
}
