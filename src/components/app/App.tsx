import React from 'react'
import './App.css'
import AppMessages from '../app-messages/app-messages'
import AppTerminal from '../app-terminal/app-terminal'

const App: React.FC = () => {
  const messages = ['foo', 'bar', 'baz']
  return (
    <div className='app'>
      <div className='title'>Game</div>
      <div className='game-field'>
        <AppMessages messages={messages} />
        <AppTerminal />
      </div>
    </div>
  )
}

export default App
