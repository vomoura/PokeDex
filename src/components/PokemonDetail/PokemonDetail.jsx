import './PokemonDetail.css'
import { useLanguage } from '../../context/LanguageContext'

function PokemonDetail({ pokemon, onClose }) {
  const { t } = useLanguage()
  return (
    <div className="pokemon-detail-overlay" onClick={onClose}>
      <div className="pokemon-detail" onClick={(e) => e.stopPropagation()}>
        <div className="detail-header">
          <button className="close-btn" onClick={onClose}>×</button>
          <h2>{pokemon.name}</h2>
          <div className="pokemon-id">#{String(pokemon.id).padStart(3, '0')}</div>
        </div>
        <img className="detail-image" src={pokemon.sprites.other['official-artwork'].front_default} alt={pokemon.name} />
        <div className="detail-content">
          <div className="detail-section">
            <div className="types">
              {pokemon.types.map(t => (
                <span key={t.type.name} className={`type ${t.type.name}`}>
                  {t.type.name}
                </span>
              ))}
            </div>
          </div>
          <div className="detail-section">
            <h3>{t.stats}</h3>
            <div className="stats">
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
          </div>
          <div className="detail-section">
            <div className="info-grid">
              <div className="info-item">
                <span className="info-label">{t.height}</span>
                <span className="info-value">{pokemon.height / 10}m</span>
              </div>
              <div className="info-item">
                <span className="info-label">{t.weight}</span>
                <span className="info-value">{pokemon.weight / 10}kg</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default PokemonDetail
