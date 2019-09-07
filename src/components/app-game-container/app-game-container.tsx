import './app-game-container.css'
import { addCommand,setNextCommandHistoryPosition, setPreviousCommandHistoryPosition  } from '../../state/actions/commands-history-actions'
import { appStore } from '../../state/reducers/state-reducers'
import { Directions } from '../../models/directions';
import { getActions } from '../../features/processors/effect-processor'
import { getActorsStream } from '../../features/processors/actors-processor'
import { getEffect } from '../../features/helpers/effect-helper'
import * as React from 'react'
import AppMessages from '../app-messages/app-messages'
import AppTerminal from '../app-terminal/app-terminal'


export interface IAppGameContainerProps {}
export interface IAppGameContainerState {
  lastCommand: string
  messages: string[]
}

export default class AppGameContainer extends React.Component<
  IAppGameContainerProps,
  IAppGameContainerState
> {
  state = {
    lastCommand: '',
    messages: []
  }

  componentDidMount() {
    //subscribe to messages and commands in store
    appStore.subscribe(() => {
      const commands = appStore.getState().commandsHistory.commands
      const position = appStore.getState().commandsHistory.position
      const messages = appStore.getState().messages
      this.setState({
        lastCommand: commands[position],
        messages 
      })
    })
    //subscribe to actors stream. The stream change actors placement
    getActorsStream().subscribe(actions => {
      actions.forEach(a => appStore.dispatch(a))
    })
  }

  handleCommandEnter = (command: string) => {
    const state = appStore.getState()
    const effect = getEffect(command, state)
    const actions = getActions(effect, state)

    actions.forEach(a => appStore.dispatch(a))
    appStore.dispatch(addCommand(command))
  }

  handleCommandFromHistory = (direction: Directions): void => {
    if(direction === Directions.previous) {
      appStore.dispatch(setPreviousCommandHistoryPosition())
      }
    else if(direction === Directions.next) {
      appStore.dispatch(setNextCommandHistoryPosition())
    }
  }

  public render() {
    return (
      <div className='game-container'>
        <AppMessages messages={this.state.messages} />
        <AppTerminal
          lastCommand={this.state.lastCommand}
          onCommandEnter={command => this.handleCommandEnter(command)}
          onCommandFromHistory={(direction: Directions) => this.handleCommandFromHistory(direction)}
        />
      </div>
    )
  }
}
