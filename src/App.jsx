import { useState } from 'react'
import heroImg from './assets/hero.png'
import reactLogo from './assets/react.svg'
import viteLogo from './assets/vite.svg'
import SongCard from './SongCard'
import './App.css'

function App() {

  return (
    <div>
      <h1>My Music Library</h1>
      <SongCard
        title="My First Song"
        artist="My First Artist"
      />
      <SongCard
        title="My Second Song"
        artist="My Second Artist"
      />
    </div>
  )
}

export default App
