import React from 'react'
import './App.css'
import AppGamefield from '../app-gamefield/app-gamefield'
import AppTitle from '../app-title/app-title'

const App: React.FC = () => {
  return (
    <div className='app'>
      {' '}
      <AppTitle/>
      <AppGamefield />{' '}
    </div>
  )
}

export default App
