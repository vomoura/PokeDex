import { useRef, useState } from 'react'
import './FilterMenu.css'

import BugIcon from '../../../../assets/icons/Bug-1.svg'
import BugIcon1 from '../../../../assets/icons/Bug.svg'
import DarkIcon from '../../../../assets/icons/Dark-1.svg'
import DarkIcon1 from '../../../../assets/icons/Dark.svg'
import DragonIcon from '../../../../assets/icons/Dragon-1.svg'
import DragonIcon1 from '../../../../assets/icons/Dragon.svg'
import ElectricIcon from '../../../../assets/icons/Electric-1.svg'
import ElectricIcon1 from '../../../../assets/icons/Electric.svg'
import FairyIcon from '../../../../assets/icons/Fairy-1.svg'
import FairyIcon1 from '../../../../assets/icons/Fairy.svg'
import FightingIcon from '../../../../assets/icons/Fighting-1.svg'
import FightingIcon1 from '../../../../assets/icons/Fighting.svg'
import FireIcon from '../../../../assets/icons/Fire-1.svg'
import FireIcon1 from '../../../../assets/icons/Fire.svg'
import FlyingIcon from '../../../../assets/icons/Flying-1.svg'
import FlyingIcon1 from '../../../../assets/icons/Flying.svg'
import GhostIcon from '../../../../assets/icons/Ghost-1.svg'
import GhostIcon1 from '../../../../assets/icons/Ghost.svg'
import GrassIcon from '../../../../assets/icons/Grass-1.svg'
import GrassIcon1 from '../../../../assets/icons/Grass.svg'
import GroundIcon from '../../../../assets/icons/Ground-1.svg'
import GroundIcon1 from '../../../../assets/icons/Ground.svg'
import IceIcon from '../../../../assets/icons/Ice-1.svg'
import IceIcon1 from '../../../../assets/icons/Ice.svg'
import NormalIcon from '../../../../assets/icons/Normal-1.svg'
import NormalIcon1 from '../../../../assets/icons/Normal.svg'
import PoisonIcon from '../../../../assets/icons/Poison-1.svg'
import PoisonIcon1 from '../../../../assets/icons/Poison.svg'
import PsychicIcon from '../../../../assets/icons/Psychic-1.svg'
import PsychicIcon1 from '../../../../assets/icons/Psychic.svg'
import RockIcon from '../../../../assets/icons/Rock-1.svg'
import RockIcon1 from '../../../../assets/icons/Rock.svg'
import SteelIcon from '../../../../assets/icons/Steel-1.svg'
import SteelIcon1 from '../../../../assets/icons/Steel.svg'
import WaterIcon from '../../../../assets/icons/Water-1.svg'
import WaterIcon1 from '../../../../assets/icons/Water.svg'

import ShortIcon from '../../../../assets/icons/HeightShortC.svg'
import ShortIcon1 from '../../../../assets/icons/HeightShort.svg'
import MediumIcon from '../../../../assets/icons/HeightMediumC.svg'
import MediumIcon1 from '../../../../assets/icons/HeightMedium.svg'
import TallIcon from '../../../../assets/icons/HeightTallC.svg'
import TallIcon1 from '../../../../assets/icons/HeightTall.svg'

import LightIcon from '../../../../assets/icons/WeightLightC.svg'
import LightIcon1 from '../../../../assets/icons/WeightLight.svg'
import NormalWIcon from '../../../../assets/icons/WeightNormalC.svg'
import NormalWIcon1 from '../../../../assets/icons/WeightNormal.svg'
import HeavyIcon from '../../../../assets/icons/WeightHeavyC.svg'
import HeavyIcon1 from '../../../../assets/icons/WeightHeavy.svg'

const TYPES = [
  { key: 'bug',      icon: BugIcon,      icon1: BugIcon1,      color: '#8CB230', shadow: 'rgba(140,178,48,0.3)' },
  { key: 'dark',     icon: DarkIcon,     icon1: DarkIcon1,     color: '#58575F', shadow: 'rgba(88,87,95,0.3)' },
  { key: 'dragon',   icon: DragonIcon,   icon1: DragonIcon1,   color: '#0F6AC0', shadow: 'rgba(15,106,192,0.3)' },
  { key: 'electric', icon: ElectricIcon, icon1: ElectricIcon1, color: '#EED535', shadow: 'rgba(238,213,53,0.3)' },
  { key: 'fairy',    icon: FairyIcon,    icon1: FairyIcon1,    color: '#ED6EC7', shadow: 'rgba(237,110,199,0.3)' },
  { key: 'fighting', icon: FightingIcon, icon1: FightingIcon1, color: '#D04164', shadow: 'rgba(208,65,100,0.3)' },
  { key: 'fire',     icon: FireIcon,     icon1: FireIcon1,     color: '#FD7D24', shadow: 'rgba(253,125,36,0.3)' },
  { key: 'flying',   icon: FlyingIcon,   icon1: FlyingIcon1,   color: '#748FC9', shadow: 'rgba(116,143,201,0.3)' },
  { key: 'ghost',    icon: GhostIcon,    icon1: GhostIcon1,    color: '#556AAE', shadow: 'rgba(85,106,174,0.3)' },
  { key: 'grass',    icon: GrassIcon,    icon1: GrassIcon1,    color: '#62B957', shadow: 'rgba(98,185,87,0.3)' },
  { key: 'ground',   icon: GroundIcon,   icon1: GroundIcon1,   color: '#DD7748', shadow: 'rgba(221,119,72,0.3)' },
  { key: 'ice',      icon: IceIcon,      icon1: IceIcon1,      color: '#61CEC0', shadow: 'rgba(97,206,192,0.3)' },
  { key: 'normal',   icon: NormalIcon,   icon1: NormalIcon1,   color: '#9DA0AA', shadow: 'rgba(157,160,170,0.3)' },
  { key: 'poison',   icon: PoisonIcon,   icon1: PoisonIcon1,   color: '#A552CC', shadow: 'rgba(165,82,204,0.3)' },
  { key: 'psychic',  icon: PsychicIcon,  icon1: PsychicIcon1,  color: '#EA5D60', shadow: 'rgba(234,93,96,0.3)' },
  { key: 'rock',     icon: RockIcon,     icon1: RockIcon1,     color: '#BAAB82', shadow: 'rgba(186,171,130,0.3)' },
  { key: 'steel',    icon: SteelIcon,    icon1: SteelIcon1,    color: '#417D9A', shadow: 'rgba(65,125,154,0.3)' },
  { key: 'water',    icon: WaterIcon,    icon1: WaterIcon1,    color: '#4A90D9', shadow: 'rgba(74,144,217,0.3)' },
]

const HEIGHTS = [
  { key: 'short',  icon: ShortIcon,  icon1: ShortIcon1,  color: '#FFC5E6', shadow: 'rgba(255,197,230,0.3)' },
  { key: 'medium', icon: MediumIcon, icon1: MediumIcon1, color: '#AEBFD7', shadow: 'rgba(174,191,215,0.3)' },
  { key: 'tall',   icon: TallIcon,   icon1: TallIcon1,   color: '#AAACB8', shadow: 'rgba(170,172,184,0.3)' },
]

const WEIGHTS = [
  { key: 'light',    icon: LightIcon,   icon1: LightIcon1,   color: '#99CD7C', shadow: 'rgba(153,205,124,0.3)' },
  { key: 'normalw',  icon: NormalWIcon,  icon1: NormalWIcon1,  color: '#57B2DC', shadow: 'rgba(87,178,220,0.3)' },
  { key: 'heavy',    icon: HeavyIcon,   icon1: HeavyIcon1,   color: '#5A92A5', shadow: 'rgba(90,146,165,0.3)' },
]

function toggleSet(set, key) {
  const next = new Set(set)
  next.has(key) ? next.delete(key) : next.add(key)
  return next
}

function ChipRow({ items, selected, onToggle, scrollable }) {
  const chips = (
    <div className="filter-chips">
      {items.map(item => {
        const active = selected.has(item.key)
        return (
          <button
            key={item.key}
            className={`filter-chip${active ? ' active' : ''}`}
            style={active ? { background: item.color, '--chip-shadow': item.shadow } : {}}
            onClick={() => onToggle(item.key)}
          >
            <img src={active ? item.icon1 : item.icon} alt={item.key} />
          </button>
        )
      })}
    </div>
  )
  if (scrollable) return <div className="filter-chips-scroll-wrapper" onMouseDown={e => e.stopPropagation()} onTouchStart={e => e.stopPropagation()}>{chips}</div>
  return chips
}

function RangeSlider({ min, max, valueMin, valueMax, onChangeMin, onChangeMax }) {
  const trackRef = useRef(null)
  const pctMin = ((valueMin - min) / (max - min)) * 100
  const pctMax = ((valueMax - min) / (max - min)) * 100

  function handlePointer(e, which) {
    e.preventDefault()
    const track = trackRef.current
    const move = (ev) => {
      const rect = track.getBoundingClientRect()
      const clientX = ev.touches ? ev.touches[0].clientX : ev.clientX
      let pct = (clientX - rect.left) / rect.width
      pct = Math.max(0, Math.min(1, pct))
      const val = Math.round(min + pct * (max - min))
      if (which === 'min') onChangeMin(Math.min(val, valueMax))
      else onChangeMax(Math.max(val, valueMin))
    }
    const up = () => {
      document.removeEventListener('mousemove', move)
      document.removeEventListener('mouseup', up)
      document.removeEventListener('touchmove', move)
      document.removeEventListener('touchend', up)
    }
    document.addEventListener('mousemove', move)
    document.addEventListener('mouseup', up)
    document.addEventListener('touchmove', move)
    document.addEventListener('touchend', up)
  }

  return (
    <div className="range-slider">
      <div className="range-track" ref={trackRef}>
        <div className="range-fill" style={{ left: `${pctMin}%`, width: `${pctMax - pctMin}%` }} />
        <div
          className="range-thumb"
          style={{ left: `${pctMin}%` }}
          onMouseDown={e => handlePointer(e, 'min')}
          onTouchStart={e => handlePointer(e, 'min')}
        />
        <div
          className="range-thumb"
          style={{ left: `${pctMax}%` }}
          onMouseDown={e => handlePointer(e, 'max')}
          onTouchStart={e => handlePointer(e, 'max')}
        />
      </div>
      <div className="range-labels">
        <span>{valueMin}</span>
        <span>{valueMax}</span>
      </div>
    </div>
  )
}

function FilterMenu({ filters, onApply, onClose }) {
  const startY = useRef(null)
  const isDragging = useRef(false)
  const [dragY, setDragY] = useState(0)
  const [closing, setClosing] = useState(false)

  const [types, setTypes] = useState(new Set(filters?.types || []))
  const [weaknesses, setWeaknesses] = useState(new Set(filters?.weaknesses || []))
  const [heights, setHeights] = useState(new Set(filters?.heights || []))
  const [weights, setWeights] = useState(new Set(filters?.weights || []))
  const [rangeMin, setRangeMin] = useState(filters?.rangeMin ?? 1)
  const [rangeMax, setRangeMax] = useState(filters?.rangeMax ?? 1025)

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

  function handleReset() {
    setTypes(new Set())
    setWeaknesses(new Set())
    setHeights(new Set())
    setWeights(new Set())
    setRangeMin(1)
    setRangeMax(1025)
  }

  function handleApply() {
    onApply({
      types: [...types],
      weaknesses: [...weaknesses],
      heights: [...heights],
      weights: [...weights],
      rangeMin,
      rangeMax,
    })
    triggerClose()
  }

  return (
    <div className={`filter-overlay${closing ? ' closing' : ''}`} onClick={triggerClose}>
      <div
        className="filter-sheet"
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
        <div className="filter-content">
          <div className="filter-handle" />
          <h2 className="filter-title">Filters</h2>
          <p className="filter-subtitle">Use advanced search to explore Pokémon by type, weakness, height and more!</p>

          <h3 className="filter-section-title">Types</h3>
          <ChipRow items={TYPES} selected={types} onToggle={k => setTypes(toggleSet(types, k))} scrollable />

          <h3 className="filter-section-title">Weaknesses</h3>
          <ChipRow items={TYPES} selected={weaknesses} onToggle={k => setWeaknesses(toggleSet(weaknesses, k))} scrollable />

          <h3 className="filter-section-title">Heights</h3>
          <ChipRow items={HEIGHTS} selected={heights} onToggle={k => setHeights(toggleSet(heights, k))} />

          <h3 className="filter-section-title">Weights</h3>
          <ChipRow items={WEIGHTS} selected={weights} onToggle={k => setWeights(toggleSet(weights, k))} />

          <h3 className="filter-section-title">Number Range</h3>
          <RangeSlider
            min={1} max={1025}
            valueMin={rangeMin} valueMax={rangeMax}
            onChangeMin={setRangeMin} onChangeMax={setRangeMax}
          />
        </div>

        <div className="filter-actions">
          <button className="filter-btn-reset" onClick={handleReset}>Reset</button>
          <button className="filter-btn-apply" onClick={handleApply}>Apply</button>
        </div>
      </div>
    </div>
  )
}

export default FilterMenu
