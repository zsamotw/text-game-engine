import { ADD_COMMAND, SET_NEXT_COMMAND_HISTORY_POSITION, SET_PREVIOUS_COMMAND_HISTORY_POSITION } from './action-types'

const addCommand = (command: string) => {
  return {
    type: ADD_COMMAND,
    command: command,
  }
}

const setNextCommandHistoryPosition = () => {
  return {
    type: SET_NEXT_COMMAND_HISTORY_POSITION 
  }
}

const setPreviousCommandHistoryPosition = () => {
  return {
    type: SET_PREVIOUS_COMMAND_HISTORY_POSITION 
  }
}


export { addCommand, setNextCommandHistoryPosition, setPreviousCommandHistoryPosition }

