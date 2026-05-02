import './PokemonCard.css'
import TypeBadge from '../TypeBadge/TypeBadge'
import PokeballIcon from '../../assets/icons/Pokeball.svg'
import PatternIcon from '../../assets/icons/Pattern.svg'
import { formatPokemonName } from '../../utils/formatName'

function PokemonCard({ pokemon, onClick }) {
  const primaryType = pokemon.types[0].type.name

  return (
    <div className="pokemon-card-container">
      <div className={`pokemon-card ${primaryType}`} onClick={onClick}>
      <div className="card-bg">
        <img className="pattern-bg" src={PatternIcon} alt="" />
        <img className="pokeball-bg" src={PokeballIcon} alt="" />
      </div>
      <div className="pokemon-header">
        <div className="pokemon-id">#{String(pokemon.id).padStart(3, '0')}</div>
        <h3>{formatPokemonName(pokemon.name)}</h3>
      </div>
      <div className="types">
        {pokemon.types.map(t => (
          <TypeBadge key={t.type.name} type={t.type.name} />
        ))}
      </div>
      <img className="pokemon-img" src={pokemon.sprites.other['official-artwork'].front_default} alt={pokemon.name} />
      </div>
    </div>
  )
}

export default PokemonCard