import { useState } from 'react'
import Home from './components/Home/Home'
import PokemonList from './components/PokemonList/PokemonList'
import PokemonDetail from './components/PokemonDetail/PokemonDetail'
import './App.css'

function App() {
  const [selectedPokemon, setSelectedPokemon] = useState(null)
  const [searchTerm, setSearchTerm] = useState('')

  return (
    <div className="app">
      <div className="container">
        <Home searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
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
    </div>
  )
}

export default App
