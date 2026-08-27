import './App.css'
import SongCard from './SongCard.jsx'

function App() {
  const songs = [
  {
    id: 1,
    title: "My First Song",
    artist: "My First Artist"
  },
  {
    id: 2,
    title: "My Second Song",
    artist: "My Second Artist"
  },
  {
    id: 3,
    title: "My Third Song",
    artist: "My Third Artist"
  },
  {
    id: 4,
    title: "My Fourth Song",
    artist: "My Fourth Artist"
  },
  {
    id: 5,
    title: "My Fifth Song",
    artist: "My Fifth Artist"
  },
  {
    id: 6,
    title: "My Sixth Song",
    artist: "My Sixth Artist"
  }
]

  return (
    <div>
      <h1>My Music Library</h1>

      <div className="song-grid">
        {songs.map((song) => (
          <SongCard
            key={song.id}
            title={song.title}
            artist={song.artist}
          />
        ))}
      </div>
    </div>
  )
}

export default App