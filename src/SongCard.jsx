function SongCard({ song }) {
  return (
    <div className="song-card">
      <div className="vinyl-hover-area">
        <img
          src="/vinyl.png"
          alt="Vinyl record"
        />
      </div>

      <h2>{song.title}</h2>
      <p>{song.artist}</p>
    </div>
  )
}

export default SongCard