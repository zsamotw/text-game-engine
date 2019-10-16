import React from 'react'
import './app-title.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEye } from '@fortawesome/free-solid-svg-icons'

const icon = <FontAwesomeIcon icon={faEye} />

const AppTitle = () => (
  <div className='title-container'>
    <span className='title'>
      Game <span className='animated-eye'>{icon}</span>
      <div className='info-container'>Powered by Tomasz</div>
    </span>
  </div>
)

export default AppTitle
