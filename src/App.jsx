import { useState } from 'react'
import SongCard from './SongCard.jsx'
import songs from './songs.js'
import './App.css'

function App() {
  const [playingSongId, setPlayingSongId] = useState(null)

  function handlePlay(songId) {
    setPlayingSongId(songId)
  }

  function handlePause() {
    setPlayingSongId(null)
  }

  return (
    <div>
      <h1>My Music Library</h1>

      <div className="song-grid">
        {songs.map((song) => (
          <SongCard
            key={song.id}
            song={song}
            isPlaying={playingSongId === song.id}
            anotherSongPlaying={
              playingSongId !== null && playingSongId !== song.id
            }
            onPlay={() => handlePlay(song.id)}
            onPause={handlePause}
          />
        ))}
      </div>
    </div>
  )
}

export default App