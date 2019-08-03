import { ADD_COMMAND } from './action-types'

const addCommand = (command: string) => {
  return {
    type: ADD_COMMAND,
    command: command,
  }
}

export { addCommand }

