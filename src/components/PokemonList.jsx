import { usePokemon } from '../hooks/usePokemon'
import PokemonCard from './PokemonCard'
import './PokemonList.css'

function PokemonList({ searchTerm, onSelectPokemon }) {
  const { pokemon, loading } = usePokemon()

  const filteredPokemon = pokemon.filter(p =>
    p.name.toLowerCase().includes(searchTerm.toLowerCase())
  )

  if (loading) return <div className="loading">Carregando Pokémon...</div>

  return (
    <div className="pokemon-list">
      {filteredPokemon.map(p => (
        <PokemonCard
          key={p.id}
          pokemon={p}
          onClick={() => onSelectPokemon(p)}
        />
      ))}
    </div>
  )
}

export default PokemonList
