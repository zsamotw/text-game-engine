import './app-gamefield.css'
import { appStore } from '../../state/reducers/state-reducers'
import { getActions } from '../../features/processors/effect-processor'
import { getEffect } from '../../features/helpers/effect-helper'
import * as React from 'react'
import AppMessages from '../app-messages/app-messages'
import AppTerminal from '../app-terminal/app-terminal'
import { messages } from '../../state/initial-state'

export interface IAppGameFieldProps {}
export interface IAppGameFieldState {
  messages: string[]
}

export default class AppGameField extends React.Component<
  IAppGameFieldProps,
  IAppGameFieldState
> {
  state = {
    messages: []
  }

  componentDidMount() {
    appStore.subscribe(() =>
      this.setState({ messages: appStore.getState().messages })
    )
  }

  handleCommand = (command: string) => {
    const state = appStore.getState()
    const result = getEffect(command, state)
    const actions = getActions(result, state)
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
