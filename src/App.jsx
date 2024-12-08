import { useState, useEffect } from 'react'
import GameCard from './GameCard'
import './App.css'

function App() {

  const apiUrl = 'http://192.168.213.96:8000/games/console/ps4'

  return (
    <>
      <div>
        <GameCard apiUrl = {apiUrl}/>
      </div>
    </>
  )
}

export default App
