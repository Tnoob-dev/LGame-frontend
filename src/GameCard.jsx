import React, { useState, useEffect } from 'react';

function GameCard({ apiUrl }) {
  const [gameData, setGameData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchGameData = async () => {
      try {
        const response = await fetch(apiUrl);
        if (!response.ok) {
          // Manejo de errores HTTP más preciso
          const message = `HTTP error! status: ${response.status} ${response.statusText}`;
          throw new Error(message); 
        }
        const data = await response.json();
        setGameData(data);
      } catch (error) {
        setError(error);
        console.error("Error fetching game data:", error); // Registra el error en la consola
      } finally {
        setLoading(false);
      }
    };

    fetchGameData();
  }, [apiUrl]);


  if (loading) {
    return <div className="loading-message">Cargando...</div>;
  }

  if (error) {
    return (
      <div className="error-message">
        Error al cargar los datos: {error.message}
      </div>
    );
  }

  if (gameData.length === 0) {
    return <div>No se encontraron juegos.</div>;
  }

  return (
    <div className="game-card-container">
      {gameData.map((game) => (
        <div key={game.id} className="game-card">
          <img src={game.image} alt={game.name} className="game-image" />
          <div className="game-info">
            <h3>{game.name}</h3>
            <p>{game.genre ? game.genre.join(', ') : 'N/A'}</p>
            <p>{game.description || 'N/A'}</p>
            {game.trailer && (
              <p><a href={game.trailer} target="_blank" rel="noopener noreferrer">Ver Trailer</a></p>
            )}
            <p>{game.console || 'N/A'}</p>
          </div>
        </div>
      ))}
    </div>
  );
}

export default GameCard;

