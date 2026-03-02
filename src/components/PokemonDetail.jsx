import './PokemonDetail.css'

function PokemonDetail({ pokemon, onClose }) {
  return (
    <div className="pokemon-detail-overlay" onClick={onClose}>
      <div className="pokemon-detail" onClick={(e) => e.stopPropagation()}>
        <button className="close-btn" onClick={onClose}>×</button>
        <div className="detail-header">
          <h2>{pokemon.name}</h2>
          <span className="detail-id">#{String(pokemon.id).padStart(3, '0')}</span>
        </div>
        <img src={pokemon.sprites.other['official-artwork'].front_default} alt={pokemon.name} />
        <div className="types">
          {pokemon.types.map(t => (
            <span key={t.type.name} className={`type ${t.type.name}`}>
              {t.type.name}
            </span>
          ))}
        </div>
        <div className="stats">
          <h3>Stats</h3>
          {pokemon.stats.map(s => (
            <div key={s.stat.name} className="stat">
              <span className="stat-name">{s.stat.name}</span>
              <div className="stat-bar">
                <div className="stat-fill" style={{ width: `${(s.base_stat / 255) * 100}%` }}></div>
              </div>
              <span className="stat-value">{s.base_stat}</span>
            </div>
          ))}
        </div>
        <div className="info">
          <div className="info-item">
            <span>Altura:</span> {pokemon.height / 10}m
          </div>
          <div className="info-item">
            <span>Peso:</span> {pokemon.weight / 10}kg
          </div>
        </div>
      </div>
    </div>
  )
}

export default PokemonDetail
