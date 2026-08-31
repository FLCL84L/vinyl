import { useEffect, useRef, useState } from 'react'

function SongCard({
  song,
  isPlaying,
  anotherSongPlaying,
  audioRef,
  onPlay,
  onPause,
  discRef
}) {
  const previewTimeoutRef = useRef(null)
  const previewingRef = useRef(false)

  const [isHovered, setIsHovered] = useState(false)

  function startPreview() {
    if (isPlaying || anotherSongPlaying) {
      return
    }

    const audio = audioRef.current

    if (!audio) {
      return
    }

    // Cancel any previous preview timer.
    if (previewTimeoutRef.current) {
      clearTimeout(previewTimeoutRef.current)
      previewTimeoutRef.current = null
    }

    // Stop whatever the shared audio element was doing.
    audio.pause()

    // Load this song.
    audio.src = song.file
    audio.currentTime = 0

    previewingRef.current = true

    audio.play().catch((error) => {
      console.error(
        `Could not preview "${song.title}":`,
        error
      )

      previewingRef.current = false
    })

    // Stop the preview after 10 seconds.
    previewTimeoutRef.current = setTimeout(() => {
      if (previewingRef.current) {
        audio.pause()
        audio.currentTime = 0
        previewingRef.current = false
      }

      previewTimeoutRef.current = null
    }, 10000)
  }

  function stopPreview() {
    if (isPlaying || anotherSongPlaying) {
      return
    }

    const audio = audioRef.current

    if (!audio || !previewingRef.current) {
      return
    }

    audio.pause()
    audio.currentTime = 0

    previewingRef.current = false

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
      return
    }

    // Cancel the preview before starting normal playback.
    if (previewTimeoutRef.current) {
      clearTimeout(previewTimeoutRef.current)
      previewTimeoutRef.current = null
    }

    previewingRef.current = false

    onPlay(song.id)
  }

  // Clean up the preview timer if this card is removed.
  useEffect(() => {
    return () => {
      if (previewTimeoutRef.current) {
        clearTimeout(previewTimeoutRef.current)
      }
    }
  }, [])

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
              isPlaying
                ? 'Pause song'
                : 'Play song'
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