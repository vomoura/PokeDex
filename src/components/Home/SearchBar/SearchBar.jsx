import { useState, useEffect, useRef } from 'react'
import './SearchBar.css'
import SearchIcon from '../../../assets/icons/Search.svg'

let cachedNames = null

async function loadAllNames() {
  if (cachedNames) return cachedNames
  const res = await fetch('https://pokeapi.co/api/v2/pokemon?limit=1025')
  const data = await res.json()
  cachedNames = data.results.map(p => p.name)
  return cachedNames
}

function SearchBar({ searchTerm, setSearchTerm }) {
  const [names, setNames] = useState([])
  const [inputValue, setInputValue] = useState(searchTerm)
  const [suggestions, setSuggestions] = useState([])
  const [showSuggestions, setShowSuggestions] = useState(false)
  const wrapperRef = useRef(null)

  useEffect(() => { loadAllNames().then(setNames) }, [])

  useEffect(() => {
    if (!inputValue.trim() || names.length === 0) {
      setSuggestions([])
      return
    }
    const term = inputValue.toLowerCase()
    const matches = names.filter(n => n.includes(term)).sort().slice(0,20)
    setSuggestions(matches)
  }, [inputValue, names])

  useEffect(() => {
    function handleClickOutside(e) {
      if (wrapperRef.current && !wrapperRef.current.contains(e.target)) {
        setShowSuggestions(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  function handleChange(e) {
    const val = e.target.value
    setInputValue(val)
    setShowSuggestions(true)
    if (!val.trim()) setSearchTerm('')
  }

  function handleSelect(name) {
    setInputValue(name)
    setSearchTerm(name)
    setShowSuggestions(false)
  }

  function handleKeyDown(e) {
    if (e.key === 'Enter') {
      setSearchTerm(inputValue)
      setShowSuggestions(false)
    }
  }

  // Sync if parent resets searchTerm
  useEffect(() => {
    if (!searchTerm) setInputValue('')
  }, [searchTerm])

  function handleClear() {
    setInputValue('')
    setSearchTerm('')
    setShowSuggestions(false)
  }

  return (
    <div className="search-bar" ref={wrapperRef}>
      <div className="search-bar-inner">
        {inputValue.trim() ? (
          <button className="search-clear-btn" onClick={handleClear}>
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <path d="M12 4L4 12M4 4l8 8" stroke="#747476" strokeWidth="2" strokeLinecap="round"/>
            </svg>
          </button>
        ) : (
          <img src={SearchIcon} className="search-icon" alt="" />
        )}
        <input
          type="text"
          placeholder="What Pokémon are you looking for?"
          value={inputValue}
          onChange={handleChange}
          onKeyDown={handleKeyDown}
          onFocus={() => inputValue.trim() && setShowSuggestions(true)}
        />
        {showSuggestions && suggestions.length > 0 && (
          <ul className="search-suggestions">
            {suggestions.map(name => (
              <li key={name} onClick={() => handleSelect(name)}>
                {name}
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  )
}

export default SearchBar
