import './app-gamefield.css'
import { append } from 'ramda'
import { appStore } from '../../state/reducers/state-reducers'
import { getActionsAndMessage } from '../../features/processors/effect-processor'
import { getEffect } from '../../features/helpers/effect-helper'
import * as React from 'react'
import AppMessages from '../app-messages/app-messages'
import AppTerminal from '../app-terminal/app-terminal'

export interface IAppGameFieldProps {}
export interface IAppGameFieldState {
  messages: string[]
}

export default class AppGameField extends React.Component<
  IAppGameFieldProps,
  IAppGameFieldState
> {
  state = {
    messages: ['halo', 'ooooo']
  }

  handleCommand = (command: string) => {
    const state = appStore.getState()
    const result = getEffect(command, state)
    const { actions, message } = getActionsAndMessage(result, state) as {
      actions: any
      message: string
    }

    const messages = this.state.messages
    const newMessages = append(message, messages)

    this.setState({
      messages: newMessages
    })
    for (let action of actions) {
      appStore.dispatch(action)
    }
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
