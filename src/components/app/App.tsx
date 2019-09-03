import React from 'react'
import './App.css'
import AppGameContainer from '../app-game-container/app-game-container'
import AppTitle from '../app-title/app-title'

const App: React.FC = () => {
  return (
    <div className='app'>
      {' '}
      <AppTitle/>
      <AppGameContainer />{' '}
    </div>
  )
}

export default App
