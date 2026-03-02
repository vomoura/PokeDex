import { useState } from 'react'
import PokemonList from './components/PokemonList'
import PokemonDetail from './components/PokemonDetail'
import SearchBar from './components/SearchBar'
import './App.css'

function App() {
  const [selectedPokemon, setSelectedPokemon] = useState(null)
  const [searchTerm, setSearchTerm] = useState('')

  return (
    <div className="app">
      <header className="header">
        <h1>Pokédex</h1>
        <SearchBar searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
      </header>
      <main className="main">
        <PokemonList 
          searchTerm={searchTerm}
          onSelectPokemon={setSelectedPokemon}
        />
        {selectedPokemon && (
          <PokemonDetail 
            pokemon={selectedPokemon}
            onClose={() => setSelectedPokemon(null)}
          />
        )}
      </main>
    </div>
  )
}

export default App
