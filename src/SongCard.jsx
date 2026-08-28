function SongCard({ song }) {
  return (
    <div className="song-card">
      <img
        src="/vinyl.png"
        alt="Vinyl record"
      />

      <h2>{song.title}</h2>
      <p>{song.artist}</p>
    </div>
  )
}

export default SongCard