import * as React from 'react'
import './app-terminal.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTerminal } from '@fortawesome/free-solid-svg-icons'

export interface IAppTerminalProps {
  onCommandChange: (command: string) => void
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
      this.props.onCommandChange(event.target.value)
      this.setState({
        command: ''
      })
    }
  }

  icon = <FontAwesomeIcon icon={faTerminal} />

  public render() {
    return (
      <div>
        <span>{this.icon}</span>
        <input
          type='text'
          name='terminal'
          value={this.state.command}
          onChange={event => this.handleChange(event)}
          onKeyPress={event => this.handleKeyPress(event)}
          autoFocus={true}
        />
      </div>
    )
  }
}
