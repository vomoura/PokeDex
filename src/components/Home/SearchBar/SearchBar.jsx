import { useState, useEffect, useRef } from 'react'
import { createPortal } from 'react-dom'
import './SearchBar.css'
import SearchIcon from '../../../assets/icons/Search.svg'
import { useLanguage } from '../../../context/LanguageContext'
import { formatPokemonName } from '../../../utils/formatName'

let cachedNames = null

async function loadAllNames() {
  if (cachedNames) return cachedNames
  const res = await fetch('https://pokeapi.co/api/v2/pokemon?limit=1025')
  const data = await res.json()
  cachedNames = data.results.map(p => p.name)
  return cachedNames
}

function SearchBar({ searchTerm, setSearchTerm, className }) {
  const { t } = useLanguage()
  const [names, setNames] = useState([])
  const [inputValue, setInputValue] = useState(searchTerm)
  const [suggestions, setSuggestions] = useState([])
  const [showSuggestions, setShowSuggestions] = useState(false)
  const [dropdownStyle, setDropdownStyle] = useState({})
  const wrapperRef = useRef(null)
  const innerRef = useRef(null)

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

  const suggestionsRef = useRef(null)

  useEffect(() => {
    function handleClickOutside(e) {
      if (
        wrapperRef.current && !wrapperRef.current.contains(e.target) &&
        suggestionsRef.current && !suggestionsRef.current.contains(e.target)
      ) {
        setShowSuggestions(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  useEffect(() => {
    if (showSuggestions && innerRef.current) {
      const rect = innerRef.current.getBoundingClientRect()
      setDropdownStyle({
        position: 'fixed',
        top: rect.bottom,
        left: rect.left + 10,
        width: rect.width - 20,
      })
    }
  }, [showSuggestions, inputValue])

  function handleChange(e) {
    const val = e.target.value
    setInputValue(val)
    setShowSuggestions(true)
    if (!val.trim()) setSearchTerm('')
  }

  function handleSelect(name) {
    setInputValue(formatPokemonName(name))
    setSearchTerm(name)
    setShowSuggestions(false)
  }

  function handleKeyDown(e) {
    if (e.key === 'Enter') {
      setSearchTerm(inputValue)
      setShowSuggestions(false)
    }
  }

  // Sync with parent searchTerm
  useEffect(() => {
    if (searchTerm) {
      setInputValue(formatPokemonName(searchTerm))
    } else {
      setInputValue('')
    }
  }, [searchTerm])

  function handleClear() {
    setInputValue('')
    setSearchTerm('')
    setShowSuggestions(false)
  }

  return (
    <div className={`search-bar${className ? ' ' + className : ''}`} ref={wrapperRef}>
      <div className="search-bar-inner" ref={innerRef}>
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
          placeholder={t.searchPlaceholder}
          value={inputValue}
          onChange={handleChange}
          onKeyDown={handleKeyDown}
          onFocus={() => inputValue.trim() && setShowSuggestions(true)}
        />
      </div>
      {showSuggestions && suggestions.length > 0 && createPortal(
        <ul className="search-suggestions" ref={suggestionsRef} style={dropdownStyle}>
          {suggestions.map(name => (
            <li key={name} onClick={() => handleSelect(name)}>
              {formatPokemonName(name)}
            </li>
          ))}
        </ul>,
        document.body
      )}
    </div>
  )
}

export default SearchBar
