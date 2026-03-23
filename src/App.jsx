import { useState } from 'react'
import Home from './components/Home/Home'
import PokemonList from './components/PokemonList/PokemonList'
import PokemonDetail from './components/PokemonDetail/PokemonDetail'
import './App.css'

function App() {
  const [selectedPokemon, setSelectedPokemon] = useState(null)
  const [searchTerm, setSearchTerm] = useState('')
  const [sortBy, setSortBy] = useState('smallest')
  const [selectedGens, setSelectedGens] = useState([])
  const [filters, setFilters] = useState({
    types: [],
    weaknesses: [],
    heights: [],
    weights: [],
    rangeMin: 1,
    rangeMax: 1025,
  })

  return (
    <div className="app">
      <div className="container">
        <Home
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          sortBy={sortBy}
          onSortChange={setSortBy}
          filters={filters}
          onFilterChange={setFilters}
          selectedGens={selectedGens}
          onGensChange={setSelectedGens}
        />
        <main className="main">
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
            onClose={() => setSelectedPokemon(null)}
          />
        )}
      </div>
    </div>
  )
}

export default App
