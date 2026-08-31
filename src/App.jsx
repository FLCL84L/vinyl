import { useCallback, useEffect, useRef, useState } from 'react'
import SongCard from './SongCard.jsx'
import songs from './songs.js'
import './App.css'

function App() {
  const [playingSongId, setPlayingSongId] = useState(null)
  const [currentTime, setCurrentTime] = useState(0)
  const [duration, setDuration] = useState(0)

  const songRefs = useRef({})
  const audioRef = useRef(null)

  // Create one shared Audio object for the whole application.
  useEffect(() => {
    const audio = new Audio()
    audio.preload = 'metadata'

    audioRef.current = audio

    function handleTimeUpdate() {
      if (Number.isFinite(audio.duration)) {
        setCurrentTime(audio.currentTime)
        setDuration(audio.duration)
      }
    }

    function handleLoadedMetadata() {
      if (Number.isFinite(audio.duration)) {
        setDuration(audio.duration)
      }
    }

    function handleEnded() {
      setPlayingSongId(null)
      setCurrentTime(0)
      setDuration(0)
    }

    audio.addEventListener('timeupdate', handleTimeUpdate)
    audio.addEventListener('loadedmetadata', handleLoadedMetadata)
    audio.addEventListener('ended', handleEnded)

    return () => {
      audio.pause()
      audio.src = ''

      audio.removeEventListener('timeupdate', handleTimeUpdate)
      audio.removeEventListener(
        'loadedmetadata',
        handleLoadedMetadata
      )
      audio.removeEventListener('ended', handleEnded)
    }
  }, [])

  const handlePlay = useCallback((songId) => {
    const audio = audioRef.current
    const song = songs.find((song) => song.id === songId)

    if (!audio || !song) {
      return
    }

    audio.pause()

    audio.src = song.file
    audio.currentTime = 0

    setPlayingSongId(songId)
    setCurrentTime(0)
    setDuration(0)

    audio.play().catch((error) => {
      console.error(
        `Could not play "${song.title}":`,
        error
      )

      setPlayingSongId(null)
    })
  }, [])

  const handlePause = useCallback(() => {
    const audio = audioRef.current

    if (audio) {
      audio.pause()
      audio.currentTime = 0
    }

    setPlayingSongId(null)
    setCurrentTime(0)
    setDuration(0)
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
            audioRef={audioRef}
            onPlay={handlePlay}
            onPause={handlePause}
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

  return `${minutes}:${seconds
    .toString()
    .padStart(2, '0')}`
}

export default App