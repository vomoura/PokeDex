import './PokemonCard.css'

function PokemonCard({ pokemon, onClick }) {
  return (
    <div className="pokemon-card" onClick={onClick}>
      <div className="pokemon-id">#{String(pokemon.id).padStart(3, '0')}</div>
      <img src={pokemon.sprites.other['official-artwork'].front_default} alt={pokemon.name} />
      <h3>{pokemon.name}</h3>
      <div className="types">
        {pokemon.types.map(t => (
          <span key={t.type.name} className={`type ${t.type.name}`}>
            {t.type.name}
          </span>
        ))}
      </div>
    </div>
  )
}

export default PokemonCard
