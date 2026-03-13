import { useRef, useState } from 'react'
import GenPattern from '../../assets/icons/GenPattern.svg'
import GenPokeball from '../../assets/icons/GenPokeball.svg'
import GenPokeballDark from '../../assets/icons/GenPokeballDark.svg'
import './GenerationMenu.css'

import g1a from '../../assets/images/generation i/001.png'
import g1b from '../../assets/images/generation i/004.png'
import g1c from '../../assets/images/generation i/007.png'
import g2a from '../../assets/images/generation ii/152.png'
import g2b from '../../assets/images/generation ii/155.png'
import g2c from '../../assets/images/generation ii/158.png'
import g3a from '../../assets/images/generation iii/252.png'
import g3b from '../../assets/images/generation iii/255.png'
import g3c from '../../assets/images/generation iii/258.png'
import g4a from '../../assets/images/generation iv/387.png'
import g4b from '../../assets/images/generation iv/390.png'
import g4c from '../../assets/images/generation iv/393.png'
import g5a from '../../assets/images/generation v/495.png'
import g5b from '../../assets/images/generation v/498.png'
import g5c from '../../assets/images/generation v/501.png'
import g6a from '../../assets/images/generation vi/650.png'
import g6b from '../../assets/images/generation vi/653.png'
import g6c from '../../assets/images/generation vi/656.png'
import g7a from '../../assets/images/generation vii/722.png'
import g7b from '../../assets/images/generation vii/725.png'
import g7c from '../../assets/images/generation vii/728.png'
import g8a from '../../assets/images/generation viii/810.png'
import g8b from '../../assets/images/generation viii/813.png'
import g8c from '../../assets/images/generation viii/816.png'
import g9a from '../../assets/images/generation ix/906.png'
import g9b from '../../assets/images/generation ix/909.png'
import g9c from '../../assets/images/generation ix/912.png'

const GENERATIONS = [
  { label: 'Generation I',    imgs: [g1a, g1b, g1c] },
  { label: 'Generation II',   imgs: [g2a, g2b, g2c] },
  { label: 'Generation III',  imgs: [g3a, g3b, g3c] },
  { label: 'Generation IV',   imgs: [g4a, g4b, g4c] },
  { label: 'Generation V',    imgs: [g5a, g5b, g5c] },
  { label: 'Generation VI',   imgs: [g6a, g6b, g6c] },
  { label: 'Generation VII',  imgs: [g7a, g7b, g7c] },
  { label: 'Generation VIII', imgs: [g8a, g8b, g8c] },
  { label: 'Generation IX',   imgs: [g9a, g9b, g9c] },
]

function GenerationMenu({ selected, onSelect, onClose }) {
  const startY = useRef(null)
  const isDragging = useRef(false)
  const [dragY, setDragY] = useState(0)
  const [closing, setClosing] = useState(false)

  function triggerClose() {
    setClosing(true)
    setTimeout(onClose, 280)
  }

  function handleDragStart(clientY) {
    startY.current = clientY
    isDragging.current = true
  }

  function handleDragMove(clientY) {
    if (!isDragging.current) return
    const dy = clientY - startY.current
    if (dy > 0) setDragY(dy)
  }

  function handleDragEnd() {
    if (!isDragging.current) return
    isDragging.current = false
    if (dragY > 80) triggerClose()
    else setDragY(0)
  }

  function handleCardClick(i) {
    onSelect(i)
    setTimeout(triggerClose, 600)
  }

  return (
    <div className={`gen-overlay${closing ? ' closing' : ''}`} onClick={onClose}>
      <div
        className="gen-sheet"
        style={{ transform: `translateY(${dragY}px)`, transition: dragY === 0 ? '' : 'none' }}
        onClick={e => e.stopPropagation()}
        onTouchStart={e => handleDragStart(e.touches[0].clientY)}
        onTouchMove={e => handleDragMove(e.touches[0].clientY)}
        onTouchEnd={handleDragEnd}
        onMouseDown={e => handleDragStart(e.clientY)}
        onMouseMove={e => handleDragMove(e.clientY)}
        onMouseUp={handleDragEnd}
        onMouseLeave={handleDragEnd}
      >
        <div className="gen-handle" />
        <h2 className="gen-title">Generations</h2>
        <p className="gen-subtitle">Use search for generations to explore your Pokémon!</p>
        <div className="gen-grid">
          {GENERATIONS.map((gen, i) => (
            <button
              key={gen.label}
              className={`gen-card${selected === i ? ' active' : ''}`}
              onClick={() => handleCardClick(i)}
            >
              <img className="gen-pattern" src={GenPattern} alt="" />
              <img className="gen-pokeball" src={selected === i ? GenPokeball : GenPokeballDark} alt="" />
              <div className="gen-imgs">
                {gen.imgs.map((src, j) => <img key={j} src={src} alt="" />)}
              </div>
              <span>{gen.label}</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}

export default GenerationMenu
