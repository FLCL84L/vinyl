import { useEffect, useRef, useState } from 'react'

function SongCard({
  song,
  isPlaying,
  anotherSongPlaying,
  onPlay,
  onPause,
  onTimeUpdate,
  discRef
}) {
  const audioRef = useRef(null)
  const previewTimeoutRef = useRef(null)
  const [isHovered, setIsHovered] = useState(false)

  useEffect(() => {
    const audio = new Audio(song.file)

    audioRef.current = audio

    function handleEnded() {
      onPause()
    }

    function handleTimeUpdate() {
      onTimeUpdate(
        audio.currentTime,
        audio.duration
      )
    }

    function handleLoadedMetadata() {
      onTimeUpdate(
        audio.currentTime,
        audio.duration
      )
    }

    audio.addEventListener('ended', handleEnded)
    audio.addEventListener('timeupdate', handleTimeUpdate)
    audio.addEventListener(
      'loadedmetadata',
      handleLoadedMetadata
    )

    return () => {
      audio.pause()
      audio.currentTime = 0

      audio.removeEventListener('ended', handleEnded)
      audio.removeEventListener(
        'timeupdate',
        handleTimeUpdate
      )
      audio.removeEventListener(
        'loadedmetadata',
        handleLoadedMetadata
      )

      if (previewTimeoutRef.current) {
        clearTimeout(previewTimeoutRef.current)
      }
    }
  }, [song.file, onPause, onTimeUpdate])

  useEffect(() => {
    const audio = audioRef.current

    if (!audio) return

    if (isPlaying) {
      if (previewTimeoutRef.current) {
        clearTimeout(previewTimeoutRef.current)
        previewTimeoutRef.current = null
      }

      audio.currentTime = 0
      audio.play().catch(() => {})
    } else {
      audio.pause()
      audio.currentTime = 0
    }
  }, [isPlaying])

  function startPreview() {
    if (isPlaying || anotherSongPlaying) return

    const audio = audioRef.current

    if (!audio) return

    audio.currentTime = 0
    audio.play().catch(() => {})

    previewTimeoutRef.current = setTimeout(() => {
      audio.pause()
      audio.currentTime = 0
    }, 10000)
  }

  function stopPreview() {
    if (isPlaying || anotherSongPlaying) return

    const audio = audioRef.current

    if (!audio) return

    audio.pause()
    audio.currentTime = 0

    if (previewTimeoutRef.current) {
      clearTimeout(previewTimeoutRef.current)
      previewTimeoutRef.current = null
    }
  }

  function handleMouseEnter() {
    setIsHovered(true)
    startPreview()
  }

  function handleMouseLeave() {
    setIsHovered(false)
    stopPreview()
  }

  function handleButtonClick(event) {
    event.stopPropagation()

    if (isPlaying) {
      onPause()
    } else {
      onPlay(song.id)
    }
  }

  const isDisabled = anotherSongPlaying

  return (
    <div className="song-card">
      <div
        ref={discRef}
        className={`vinyl-hover-area ${
          isPlaying ? 'playing' : ''
        } ${isDisabled ? 'disabled' : ''}`}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        <img
          src="/vinyl.png"
          alt="Vinyl record"
        />

        {(isHovered || isPlaying) && !isDisabled && (
          <button
            className="play-button"
            onClick={handleButtonClick}
            aria-label={
              isPlaying ? 'Pause song' : 'Play song'
            }
          >
            {isPlaying ? '❚❚' : '▶'}
          </button>
        )}
      </div>

      <h2>{song.title}</h2>
      <p>{song.artist}</p>
    </div>
  )
}

export default SongCard