import { ADD_MESSAGE } from './action-types'

const addMessage = (message: string) => {
  return {
    type: ADD_MESSAGE,
    message: message,
  }
}

export { addMessage }
