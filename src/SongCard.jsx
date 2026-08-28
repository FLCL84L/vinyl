import { useEffect, useRef } from 'react'

function SongCard({ song }) {
  const audioRef = useRef(null)
  const sampleIntervalRef = useRef(null)

  useEffect(() => {
    audioRef.current = new Audio(song.file)

    return () => {
      audioRef.current.pause()
      audioRef.current = null

      if (sampleIntervalRef.current) {
        clearInterval(sampleIntervalRef.current)
      }
    }
  }, [song.file])

  function playSample() {
    const audio = audioRef.current

    if (!audio) return

    audio.currentTime = 0
    audio.play().catch(() => {})

    sampleIntervalRef.current = setInterval(() => {
      audio.currentTime = 0
      audio.play().catch(() => {})
    }, 10000)
  }

  function stopSample() {
    const audio = audioRef.current

    if (!audio) return

    audio.pause()
    audio.currentTime = 0

    if (sampleIntervalRef.current) {
      clearInterval(sampleIntervalRef.current)
      sampleIntervalRef.current = null
    }
  }

  return (
    <div className="song-card">
      <div
        className="vinyl-hover-area"
        onMouseEnter={playSample}
        onMouseLeave={stopSample}
      >
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