import { useState, useEffect } from 'react'
import GameCard from './Components/GameCard'
import Header from './Components/Header'
import './App.css'

function App() {

  const apiUrl = 'http://192.168.213.96:8000/games/all/'

  return (
    <>
      <div>
        <Header />
        <GameCard apiUrl = {apiUrl}/>
      </div>
    </>
  )
}

export default App
