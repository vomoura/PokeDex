import { useState, useRef, useCallback } from 'react'
import Home from './components/Home/Home'
import PokemonList from './components/PokemonList/PokemonList'
import PokemonDetail from './components/PokemonDetail/PokemonDetail'
import './App.css'

const COLLAPSE_DISTANCE = 150

function App() {
  const [selectedPokemon, setSelectedPokemon] = useState(null)
  const [searchTerm, setSearchTerm] = useState('')
  const [sortBy, setSortBy] = useState('smallest')
  const [selectedGens, setSelectedGens] = useState([])
  const [scrollProgress, setScrollProgress] = useState(0)
  const mainRef = useRef(null)
  const userScrolledRef = useRef(false)
  const [filters, setFilters] = useState({
    types: [],
    weaknesses: [],
    heights: [],
    weights: [],
    rangeMin: 1,
    rangeMax: 1025,
  })

  const handleScroll = useCallback(() => {
    if (mainRef.current) {
      const scrollTop = mainRef.current.scrollTop
      if (scrollTop > 0) userScrolledRef.current = true
      // Only collapse back if user actually scrolled back to top
      if (scrollTop === 0 && !userScrolledRef.current) return
      if (scrollTop === 0) userScrolledRef.current = false
      const progress = Math.min(scrollTop / COLLAPSE_DISTANCE, 1)
      setScrollProgress(progress)
    }
  }, [])

  const handleSearchTerm = useCallback((term) => {
    setSearchTerm(term)
    // Keep header collapsed when searching from collapsed state
    if (term && scrollProgress >= 1) {
      setTimeout(() => {
        if (mainRef.current && mainRef.current.scrollTop === 0) {
          userScrolledRef.current = false
        }
      }, 100)
    }
  }, [scrollProgress])

  const handleCloseDetail = useCallback(() => {
    setSelectedPokemon(null)
    if (mainRef.current) mainRef.current.scrollTop = 0
    userScrolledRef.current = false
    setScrollProgress(0)
  }, [])

  return (
    <div className="app">
      <div className="container">
        <Home
          searchTerm={searchTerm}
          setSearchTerm={handleSearchTerm}
          sortBy={sortBy}
          onSortChange={setSortBy}
          filters={filters}
          onFilterChange={setFilters}
          selectedGens={selectedGens}
          onGensChange={setSelectedGens}
          scrollProgress={scrollProgress}
        />
        <main className="main" ref={mainRef} onScroll={handleScroll}>
          <PokemonList
            searchTerm={searchTerm}
            sortBy={sortBy}
            filters={filters}
            selectedGens={selectedGens}
            onSelectPokemon={setSelectedPokemon}
          />
        </main>
        {selectedPokemon && (
          <PokemonDetail
            pokemon={selectedPokemon}
            onClose={handleCloseDetail}
          />
        )}
      </div>
    </div>
  )
}

export default App
