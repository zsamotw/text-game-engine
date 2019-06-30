import './App-gamefield.css'
import { append, clone } from 'ramda'
import {
  getResult,
  getNewStateAndMessage
} from '../../features/processors/resultProcessor'
import * as React from 'react'
import AppMessages from '../app-messages/App-messages'
import AppTerminal from '../app-terminal/App-terminal'
import state from '../../db/state'
import State from '../../models/state'

export interface IAppGameFieldProps {}
export interface IAppGameFieldState {
  messages: string[]
  gameState: State
}

export default class AppGameField extends React.Component<
  IAppGameFieldProps,
  IAppGameFieldState
> {
  state = {
    messages: ['halo', 'ooooo'],
    gameState: state.state
  }

  handleCommand = (command: string) => {
    const result = getResult(command, clone(this.state.gameState))
    const { state, message } = getNewStateAndMessage(
      result,
      clone(this.state.gameState)
    ) as { state: State; message: string }

    const messages = this.state.messages
    const newMessages = append(message, messages)

    this.setState({
      messages: newMessages,
      gameState: state
    })
  }

  public render() {
    return (
      <div className='game-field'>
        <AppMessages messages={this.state.messages} />
        <AppTerminal onCommandChange={command => this.handleCommand(command)} />
      </div>
    )
  }
}
