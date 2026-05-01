import "./Stats.css";
import { useLanguage } from "../../../context/LanguageContext";

const STAT_LABELS = {
  hp: "HP",
  attack: "Attack",
  defense: "Defense",
  "special-attack": "Sp. Atk",
  "special-defense": "Sp. Def",
  speed: "Speed",
};

function calcMin(base, isHp) {
  if (isHp) return Math.floor(((2 * base) * 100) / 100 + 100 + 10);
  return Math.floor((Math.floor(((2 * base) * 100) / 100) + 5) * 0.9);
}

function calcMax(base, isHp) {
  if (isHp) return Math.floor(((2 * base + 31 + 63) * 100) / 100 + 100 + 10);
  return Math.floor((Math.floor(((2 * base + 31 + 63) * 100) / 100) + 5) * 1.1);
}

export default function Stats({ pokemon, typeColor }) {
  const { t } = useLanguage();
  const total = pokemon.stats.reduce((sum, s) => sum + s.base_stat, 0);
  return (
    <div className="tab-content">
      <table className="data-table stats-table">
        <tbody>
          {pokemon.stats.map((s) => {
            const isHp = s.stat.name === "hp";
            return (
              <tr key={s.stat.name}>
                <td className="stat-label">
                  {STAT_LABELS[s.stat.name] || s.stat.name}
                </td>
                <td className="stat-num">
                  {String(s.base_stat).padStart(3, "0")}
                </td>
                <td className="stat-bar-cell">
                  <div className="stat-bar">
                    <div
                      className="stat-fill"
                      style={{
                        width: `${(s.base_stat / 255) * 100}%`,
                        backgroundColor: typeColor,
                      }}
                    />
                  </div>
                </td>
                <td className="stat-minmax">{calcMin(s.base_stat, isHp)}</td>
                <td className="stat-minmax">{calcMax(s.base_stat, isHp)}</td>
              </tr>
            );
          })}
          <tr>
            <td className="stat-label">Total</td>
            <td className="stat-num">{String(total).padStart(3, "0")}</td>
            <td />
            <td className="stat-minmax stat-minmax-header">Min</td>
            <td className="stat-minmax stat-minmax-header">Max</td>
          </tr>
        </tbody>
      </table>
      <p className="stat-minmax-note">{t.statsNote}</p>
    </div>
  );
}
