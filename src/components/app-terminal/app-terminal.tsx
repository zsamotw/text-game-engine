import * as React from 'react'
import './app-terminal.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTerminal } from '@fortawesome/free-solid-svg-icons'
import { arrowUp, arrowDown } from '../../models/keyCode'
import { Directions } from '../../models/directions'

export interface IAppTerminalProps {
  lastCommand: string
  onCommandEnter: (command: string) => void
  onCommandFromHistory: (direction: Directions) => void
}

export interface IAppTerminalState {
  command: string
}

export default class AppTerminal extends React.Component<
  IAppTerminalProps,
  IAppTerminalState
> {
  state = {
    command: ''
  }

  handleChange = (event: any) => {
    this.setState({
      command: event.target.value
    })
  }

  handleKeyPress = (event: any) => {
    if (event.key === 'Enter') {
      this.props.onCommandEnter(event.target.value)
      this.setState({ command: '' })
    } else if (event.keyCode === arrowUp) {
      this.props.onCommandFromHistory(Directions.next)
      setTimeout(() => this.setState({ command: this.props.lastCommand }))
    } else if (event.keyCode === arrowDown) {
      this.props.onCommandFromHistory(Directions.previous)
      setTimeout(() => this.setState({ command: this.props.lastCommand }))
    }
  }

  icon = <FontAwesomeIcon icon={faTerminal} />

  public render() {
    return (
      <div>
        {/* <span>{this.icon}</span> */}
        <span>~$ </span>
        <input
          type='text'
          name='terminal'
          value={this.state.command}
          onChange={event => this.handleChange(event)}
          onKeyDown={event => this.handleKeyPress(event)}
          autoFocus={true}
        />
      </div>
    )
  }
}
