import { useCallback, useRef, useState } from 'react'
import SongCard from './SongCard.jsx'
import songs from './songs.js'
import './App.css'

function App() {
  const [playingSongId, setPlayingSongId] = useState(null)
  const [currentTime, setCurrentTime] = useState(0)
  const [duration, setDuration] = useState(0)

  const songRefs = useRef({})

  const handlePlay = useCallback((songId) => {
    setPlayingSongId(songId)
    setCurrentTime(0)
    setDuration(0)
  }, [])

  const handlePause = useCallback(() => {
    setPlayingSongId(null)
    setCurrentTime(0)
    setDuration(0)
  }, [])

  const handleTimeUpdate = useCallback((time, songDuration) => {
    setCurrentTime(time)
    setDuration(songDuration)
  }, [])

  function focusPlayingSong() {
    const playingDisc = songRefs.current[playingSongId]

    if (playingDisc) {
      playingDisc.scrollIntoView({
        behavior: 'smooth',
        block: 'center'
      })
    }
  }

  const playingSong = songs.find(
    (song) => song.id === playingSongId
  )

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
              playingSongId !== null &&
              playingSongId !== song.id
            }
            onPlay={handlePlay}
            onPause={handlePause}
            onTimeUpdate={handleTimeUpdate}
            discRef={(element) => {
              songRefs.current[song.id] = element
            }}
          />
        ))}
      </div>

      {playingSong && (
        <button
          className="now-playing"
          onClick={focusPlayingSong}
        >
          <div className="now-playing-info">
            <strong>{playingSong.title}</strong>
            <span>{playingSong.artist}</span>
          </div>

          <div className="progress-container">
            <div
              className="progress-bar"
              style={{
                width: duration
                  ? `${(currentTime / duration) * 100}%`
                  : '0%'
              }}
            />
          </div>

          <div className="time-display">
            <span>{formatTime(currentTime)}</span>
            <span>{formatTime(duration)}</span>
          </div>
        </button>
      )}
    </div>
  )
}

function formatTime(time) {
  if (!time || Number.isNaN(time)) {
    return '0:00'
  }

  const minutes = Math.floor(time / 60)
  const seconds = Math.floor(time % 60)

  return `${minutes}:${seconds.toString().padStart(2, '0')}`
}

export default App