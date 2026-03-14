import { useRef, useState } from 'react'
import './SortMenu.css'

const SORT_OPTIONS = [
  { key: 'smallest', label: 'Smallest number first' },
  { key: 'highest', label: 'Highest number first' },
  { key: 'az', label: 'A-Z' },
  { key: 'za', label: 'Z-A' },
]

function SortMenu({ selected, onSelect, onClose }) {
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

  function handleOptionClick(key) {
    onSelect(key)
    setTimeout(triggerClose, 300)
  }

  return (
    <div className={`sort-overlay${closing ? ' closing' : ''}`} onClick={triggerClose}>
      <div
        className="sort-sheet"
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
        <div className="sort-handle" />
        <h2 className="sort-title">Sort</h2>
        <p className="sort-subtitle">Sort Pokémon alphabetically or by National Pokédex number!</p>
        <div className="sort-options">
          {SORT_OPTIONS.map(opt => (
            <button
              key={opt.key}
              className={`sort-option${selected === opt.key ? ' active' : ''}`}
              onClick={() => handleOptionClick(opt.key)}
            >
              {opt.label}
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}

export default SortMenu
