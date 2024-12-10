import React, { useState, useEffect } from 'react'

function GameCard() {
  const [gameData, setGameData] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [showModal, setShowModal] = useState(false)
  const [description, setDescription] = useState('')
  const [console, setConsole] = useState('') 

  useEffect(() => {
    const pathname = window.location.pathname
    const consoleName = pathname.substring(1)
    setConsole(consoleName)

    const fetchGameData = async () => {
      try {
        // esto provocara un error, a partir de ese error, se aprovechara para mostrar los botones 
        // de las consolas, y no el error en si, para ver el error debe verse en la consola
        let apiUrl = `http://192.168.213.96:8000/games/`
        if (consoleName) {
          apiUrl += `console/${consoleName}`
        }
        const response = await fetch(apiUrl)
        if (!response.ok) {
          const message = `HTTP error! status: ${response.status} ${response.statusText}`
          throw new Error(message)
        }
        const data = await response.json()
        setGameData(data)
      } catch (error) {
        setError(error)
        console.error("Error fetching game data:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchGameData()
  }, [console])


  const handleShowDescription = (game) => {
    setDescription(game.description || "No hay descripción disponible")
    setShowModal(true)
  }

  const handleCloseModal = () => {
    setShowModal(false)
  }

  if (loading) {
    return <div className="loading-message">Cargando...</div>
  }

  if (error) { // Lo muestro en el error, ya que es donde mejor he podido controlar esto para que salgan las cosas en el main page
    return (
      <div className="main-page-links">
        <a className='links' href="/ps2">PlayStation 2</a>
        <a className='links' href="/ps3">PlayStation 3</a>
        <a className='links' href="/ps4">PlayStation 4</a>
        <a className='links' href="/ps5">PlayStation 5</a>
        <a className='links' href="/xbox%20360">XBOX 360</a>
        <a className='links' href="/xbox%20one">XBOX One</a>
        <a className='links' href="/xbox%20series">XBOX Series X|S</a>
        <a className='links' href="/nintendo%20switch">Nintendo Switch</a>
        <a className='links' href="/wii">Wii</a>
        <a className='links' href="/wii%20u">Wii U</a>
        <a className='links' href="/ds">Nintendo DS</a>
        <a className='links' href="/3ds">Nintendo 3DS</a>
        <a className='links' href="/psp">PSP</a>
        <a className='links' href="/psvita">PSVita</a>
        <a className='links' href="/android">Android</a>
        <a className='links' href="/pc">PC</a>
        <a className='links' href="/vr">VR</a>
      </div>
    )
  }

  if (gameData.length === 0) {
    return <div>No se encontraron juegos.</div>
  }

  return (
    <div className="game-card-container">
      {gameData.map((game) => (
        <div key={game.id} className="game-card">
          <div className="img-div">
            <img src={game.image} alt={game.name} className="game-image" />
          </div>
          <div className="game-info">
            <h3>{game.name}</h3>
            <p>{game.genre ? game.genre.join(", ") : "N/A"}</p>
            <button className="btnDesc" onClick={() => handleShowDescription(game)}>Descripción</button>
            {game.trailer && (
              <p><a className="trailer" href={game.trailer} target="_blank" rel="noopener noreferrer">Trailer</a></p>
            )}
            <p>{game.console.toUpperCase() || 'N/A'}</p>
          </div>
        </div>
      ))}
      {showModal && (
        <div className="modal">
          <div className="modal-content">
            <span className="close-modal" onClick={handleCloseModal}>&times</span>
            <p>{description}</p>
            <button className="btnCloseModal" onClick={handleCloseModal}>Cerrar</button>
          </div>
        </div>
      )}
    </div>
    
  )
}

export default GameCard