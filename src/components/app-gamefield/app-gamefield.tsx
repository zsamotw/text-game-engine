import './app-gamefield.css'
import { appStore } from '../../state/reducers/state-reducers'
import { getActions } from '../../features/processors/effect-processor'
import { getEffect } from '../../features/helpers/effect-helper'
import * as React from 'react'
import AppMessages from '../app-messages/app-messages'
import AppTerminal from '../app-terminal/app-terminal'
import { getActorsStream } from '../../features/processors/actors-processor'
import { addCommand } from '../../state/actions/commands-history-actions';

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
    //subscribe to messages in store
    appStore.subscribe(() =>
      this.setState({ messages: appStore.getState().messages })
    )
    //subscribe to actors stream. The stream change actors placement
    getActorsStream().subscribe(actions => {
      actions.forEach(a => appStore.dispatch(a))
    })
  }

  handleCommand = (command: string) => {
    const state = appStore.getState()
    const result = getEffect(command, state)
    const actions = getActions(result, state)

    actions.forEach(a => appStore.dispatch(a))
    appStore.dispatch(addCommand(command))
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
