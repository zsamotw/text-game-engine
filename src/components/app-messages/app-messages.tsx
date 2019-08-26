import * as React from 'react'
import './app-messages.css'

export interface IAppMessagesProps {
  messages: string[]
}

export default class AppMessages extends React.Component<
  IAppMessagesProps,
  any
> {
  public printMessage(message: string) {
    return <div className='message-container'>{message}</div>
  }

  public render() {
    return (
      <div className='messages-container'>
        {this.props.messages.map(m => this.printMessage(m))}
      </div>
    )
  }
}
