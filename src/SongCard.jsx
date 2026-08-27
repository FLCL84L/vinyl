function SongCard({ title, artist }) {
  return (
    <div className="song-card">
      <img src="/vinyl.png" alt="Vinyl record" />

      <h2>{title}</h2>
      <p>{artist}</p>
    </div>
  )
}

export default SongCard