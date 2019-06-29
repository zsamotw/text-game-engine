import * as React from 'react'
import './App-terminal.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCoffee } from '@fortawesome/free-solid-svg-icons'

export interface IAppTerminalProps {}
export interface IAppTerminalState {
  command: string
}

export default class AppTerminal extends React.Component<
  IAppTerminalProps,
  IAppTerminalProps
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
      console.log(event.target.value)
      this.setState({
        command: ''
      })
    }
  }

  icon = <FontAwesomeIcon icon={faCoffee} />

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
