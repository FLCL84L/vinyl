import SongCard from './SongCard.jsx'
import songs from './songs.js'
import './App.css'

function App() {
  return (
    <div>
      <h1>My Music Library</h1>

      <div className="song-grid">
        {songs.map((song) => (
          <SongCard
            key={song.id}
            song={song}
          />
        ))}
      </div>
    </div>
  )
}

export default App