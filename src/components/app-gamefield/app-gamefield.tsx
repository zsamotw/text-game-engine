import './app-gamefield.css'
import { appStore } from '../../state/reducers/state-reducers'
import { getActions } from '../../features/processors/effect-processor'
import { getEffect } from '../../features/helpers/effect-helper'
import * as React from 'react'
import AppMessages from '../app-messages/app-messages'
import AppTerminal from '../app-terminal/app-terminal'
import { getActorsStream } from '../../features/processors/actors-processor'
import { addCommand,setNextCommandHistoryPosition, setPreviousCommandHistoryPosition  } from '../../state/actions/commands-history-actions'
import { Direction } from '../../models/direction';


export interface IAppGameFieldProps {}
export interface IAppGameFieldState {
  lastCommand: string
  messages: string[]
}

export default class AppGameField extends React.Component<
  IAppGameFieldProps,
  IAppGameFieldState
> {
  state = {
    lastCommand: '',
    messages: []
  }

  componentDidMount() {
    //subscribe to messages in store
    appStore.subscribe(() => {
      const commands = appStore.getState().commandsHistory.commands
      const position = appStore.getState().commandsHistory.position
      this.setState({
        lastCommand: commands[position],
        messages: appStore.getState().messages
      })
    })
    //subscribe to actors stream. The stream change actors placement
    getActorsStream().subscribe(actions => {
      actions.forEach(a => appStore.dispatch(a))
    })
  }

  handleCommandEnter = (command: string) => {
    const state = appStore.getState()
    const result = getEffect(command, state)
    const actions = getActions(result, state)

    actions.forEach(a => appStore.dispatch(a))
    appStore.dispatch(addCommand(command))
  }

  handleCommandFromHistory = (direction: Direction): void => {
    if(direction === 'previous') {
      appStore.dispatch(setPreviousCommandHistoryPosition())
      }
    else if(direction === 'next') {
      appStore.dispatch(setNextCommandHistoryPosition())
    }
  }

  public render() {
    return (
      <div className='game-field'>
        <AppMessages messages={this.state.messages} />
        <AppTerminal
          lastCommand={this.state.lastCommand}
          onCommandEnter={command => this.handleCommandEnter(command)}
          onCommandFromHistory={(direction: Direction) => this.handleCommandFromHistory(direction)}
        />
      </div>
    )
  }
}
