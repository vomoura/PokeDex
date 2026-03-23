import { useState, useEffect, useLayoutEffect, useRef } from "react";
import "./PokemonDetail.css";
import TypeBadge from "../TypeBadge/TypeBadge";
import BackArrow from "../../assets/icons/BackArrow.svg?react";
import CircleDetail from "../../assets/icons/CircleDetail.svg?react";
import PatternDetail from "../../assets/icons/PatternDetail.svg?react";
import ShinyIcon from "../../assets/icons/ShinyIcon.svg?react";
import TabPokeball from "../../assets/icons/TabPokeball.svg?react";
import VersionPokeballBlue from "../../assets/icons/VersionPokeballBlue.svg";
import VersionPokeballRed from "../../assets/icons/VersionPokeballRed.svg";
import { fetchPokemonSpecies } from "../../services/api";
import { useLanguage } from "../../context/LanguageContext";
import { formatPokemonName } from "../../utils/formatName";

const typeIcons = import.meta.glob("../../assets/types/*.svg", {
  eager: true,
  query: "?url",
  import: "default",
});
const TYPE_ICONS = Object.fromEntries(
  Object.entries(typeIcons).map(([path, url]) => [
    path.split("/").pop().replace(".svg", "").toLowerCase(),
    url,
  ]),
);

const TYPE_COLORS = {
  bug: "#8BD674",
  dark: "#6F6E78",
  dragon: "#7383B9",
  electric: "#F2CB55",
  fairy: "#EBA8C3",
  fighting: "#EB4971",
  fire: "#FFA756",
  flying: "#83A2E3",
  ghost: "#8571BE",
  grass: "#8BBE8A",
  ground: "#F78551",
  ice: "#91D8DF",
  normal: "#B5B9C4",
  poison: "#9F6E97",
  psychic: "#FF6568",
  rock: "#D4C294",
  steel: "#4C91B2",
  water: "#58ABF6",
};

const STAT_LABELS = {
  hp: "HP",
  attack: "Attack",
  defense: "Defense",
  "special-attack": "Sp. Atk",
  "special-defense": "Sp. Def",
  speed: "Speed",
};

const WEAKNESS_MAP = {
  grass: ["fire", "ice", "poison", "flying", "bug"],
  fire: ["water", "ground", "rock"],
  water: ["electric", "grass"],
  poison: ["ground", "psychic"],
  normal: ["fighting"],
  electric: ["ground"],
  ice: ["fire", "fighting", "rock", "steel"],
  fighting: ["flying", "psychic", "fairy"],
  ground: ["water", "grass", "ice"],
  flying: ["electric", "ice", "rock"],
  psychic: ["bug", "ghost", "dark"],
  bug: ["fire", "flying", "rock"],
  rock: ["water", "grass", "fighting", "ground", "steel"],
  ghost: ["ghost", "dark"],
  dragon: ["ice", "dragon", "fairy"],
  dark: ["fighting", "bug", "fairy"],
  steel: ["fire", "fighting", "ground"],
  fairy: ["poison", "steel"],
};

function getWeaknesses(types) {
  const weakSet = new Set();
  types.forEach((t) => (WEAKNESS_MAP[t] || []).forEach((w) => weakSet.add(w)));
  return [...weakSet];
}

// Version pairs ordered by generation (most recent last)
const VERSION_PAIRS = [
  ['red', 'blue'], ['gold', 'silver'], ['ruby', 'sapphire'],
  ['firered', 'leafgreen'], ['diamond', 'pearl'],
  ['heartgold', 'soulsilver'], ['black', 'white'],
  ['black-2', 'white-2'], ['x', 'y'],
  ['omega-ruby', 'alpha-sapphire'], ['sun', 'moon'],
  ['ultra-sun', 'ultra-moon'], ['lets-go-pikachu', 'lets-go-eevee'],
  ['sword', 'shield'], ['legends-arceus'],
  ['brilliant-diamond', 'shining-pearl'],
  ['scarlet', 'violet'],
];

// Versions whose entries describe regional/alternate forms
const REGIONAL_FORM_VERSIONS = {
  'legends-arceus': 'hisui',
};

function filterEntriesForForm(entries, pokemonName) {
  const isBaseForm = !pokemonName.includes('-hisui');
  if (!isBaseForm) return entries;
  return entries.filter((e) => !REGIONAL_FORM_VERSIONS[e.version.name]);
}

function getLatestVersionPair(entries) {
  for (let i = VERSION_PAIRS.length - 1; i >= 0; i--) {
    const pair = VERSION_PAIRS[i];
    const v1 = entries.find((e) => e.version.name === pair[0]);
    const v2 = pair[1] ? entries.find((e) => e.version.name === pair[1]) : null;
    if (v1) return [v1, v2];
  }
  return entries.length >= 2
    ? [entries[entries.length - 2], entries[entries.length - 1]]
    : [entries[entries.length - 1], null];
}

function AboutTab({ pokemon, species, t }) {
  const [versionIdx, setVersionIdx] = useState(0);

  const langEntries = species?.flavor_text_entries?.filter(
    (e) => e.language.name === t.apiLang
  ) || [];
  const enEntries = species?.flavor_text_entries?.filter(
    (e) => e.language.name === "en"
  ) || [];
  const entries = filterEntriesForForm(
    langEntries.length > 0 ? langEntries : enEntries,
    pokemon.name
  );
  const [v1, v2] = entries.length > 0 ? getLatestVersionPair(entries) : [null, null];
  const flavor = versionIdx === 0
    ? v1?.flavor_text?.replace(/\f/g, " ") || ""
    : v2?.flavor_text?.replace(/\f/g, " ") || v1?.flavor_text?.replace(/\f/g, " ") || "";
  const speciesName =
    species?.genera?.find((g) => g.language.name === t.apiLang)?.genus ||
    species?.genera?.find((g) => g.language.name === "en")?.genus || "";
  const abilities = pokemon.abilities.map((a, i) => ({
    name: a.ability.name
      .replace(/-/g, " ")
      .replace(/\b\w/g, (c) => c.toUpperCase()),
    hidden: a.is_hidden,
  }));
  const weaknesses = getWeaknesses(pokemon.types.map((t) => t.type.name));
  const catchRate = species?.capture_rate;
  const baseExp = pokemon.base_experience;
  const baseHappiness = species?.base_happiness;
  const growthRate =
    species?.growth_rate?.name
      ?.replace(/-/g, " ")
      .replace(/\b\w/g, (c) => c.toUpperCase()) || "";

  return (
    <div className="tab-content">
      <h4 className="section-title">{t.sectionPokedexEntry}</h4>
      <p className="flavor-text">{flavor}</p>
      <table className="data-table">
        <tbody>
          <tr>
            <td>{t.labelVersion}</td>
            <td>
              <div className="version-icons">
                <button
                  className={`version-btn${versionIdx === 0 ? " active" : ""}`}
                  onClick={() => setVersionIdx(0)}
                >
                  <img src={VersionPokeballBlue} alt="" />
                </button>
                <button
                  className={`version-btn${versionIdx === 1 ? " active" : ""}${!v2 ? " disabled" : ""}`}
                  onClick={() => v2 && setVersionIdx(1)}
                  disabled={!v2}
                >
                  <img src={VersionPokeballRed} alt="" />
                </button>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
      <h4 className="section-title">{t.sectionPokedexData}</h4>
      <table className="data-table">
        <tbody>
          <tr>
            <td>{t.labelSpecies}</td>
            <td>{speciesName}</td>
          </tr>
          <tr>
            <td>{t.labelHeight}</td>
            <td>
              {(pokemon.height / 10).toFixed(1)}m{" "}
              <span className="secondary">
                ({Math.floor((pokemon.height / 10) * 3.281)}'
                {Math.round((((pokemon.height / 10) * 3.281) % 1) * 12)
                  .toString()
                  .padStart(2, "0")}
                ")
              </span>
            </td>
          </tr>
          <tr>
            <td>{t.labelWeight}</td>
            <td>
              {(pokemon.weight / 10).toFixed(1)}kg{" "}
              <span className="secondary">
                ({((pokemon.weight / 10) * 2.205).toFixed(1)} lbs)
              </span>
            </td>
          </tr>
          <tr>
            <td>{t.labelAbilities}</td>
            <td>
              {abilities.map((a, i) => (
                <div key={i}>
                  {!a.hidden && `${i + 1}. `}
                  {a.name}
                  {a.hidden && (
                    <span className="secondary"> ({t.hiddenAbility})</span>
                  )}
                </div>
              ))}
            </td>
          </tr>
          <tr>
            <td>{t.labelWeaknesses}</td>
            <td>
              <div className="weakness-icons">
                {weaknesses.map((w) => (
                  <span
                    key={w}
                    className="weakness-badge"
                    style={{ backgroundColor: TYPE_COLORS[w] || "#9DA0AA" }}
                  >
                    {TYPE_ICONS[w] && <img src={TYPE_ICONS[w]} alt={w} />}
                  </span>
                ))}
              </div>
            </td>
          </tr>
        </tbody>
      </table>
      <h4 className="section-title">{t.sectionTraining}</h4>
      <table className="data-table">
        <tbody>
          <tr>
            <td>{t.labelEvYield}</td>
            <td>
              {pokemon.stats
                .filter((s) => s.effort > 0)
                .map(
                  (s) =>
                    `${s.effort} ${STAT_LABELS[s.stat.name] || s.stat.name}`,
                )
                .join(", ")}
            </td>
          </tr>
          <tr>
            <td>{t.labelCatchRate}</td>
            <td>
              {catchRate}{" "}
              <span className="secondary">
                {catchRate != null
                  ? `(${((catchRate / 255) * 100 * 0.059).toFixed(1)}% ${t.withPokeball})`
                  : ""}
              </span>
            </td>
          </tr>
          <tr>
            <td>{t.labelBaseFriendship}</td>
            <td>
              {baseHappiness} <span className="secondary">({t.normal})</span>
            </td>
          </tr>
          <tr>
            <td>{t.labelBaseExp}</td>
            <td>{baseExp}</td>
          </tr>
          <tr>
            <td>{t.labelGrowthRate}</td>
            <td>{growthRate}</td>
          </tr>
        </tbody>
      </table>
      <h4 className="section-title">{t.sectionBreeding}</h4>
      <table className="data-table">
        <tbody>
          <tr>
            <td>{t.labelGender}</td>
            <td>
              {species?.gender_rate == null ? (
                "—"
              ) : species.gender_rate === -1 ? (
                t.genderless
              ) : (
                <>
                  <span style={{ color: "#EA5D60" }}>♀ {species.gender_rate * 12.5}%</span>,{" "}
                  <span style={{ color: "#58ABF6" }}>♂ {100 - species.gender_rate * 12.5}%</span>
                </>
              )}
            </td>
          </tr>
          <tr>
            <td>{t.labelEggGroups}</td>
            <td>
              {species?.egg_groups
                ?.map((g) =>
                  g.name.replace(/-/g, " ").replace(/\b\w/g, (c) => c.toUpperCase())
                )
                .join(", ") || "—"}
            </td>
          </tr>
          <tr>
            <td>{t.labelEggCycles}</td>
            <td>
              {species?.hatch_counter != null ? (
                <>
                  {species.hatch_counter}{" "}
                  <span className="secondary">
                    ({(species.hatch_counter * 257).toLocaleString()} - {((species.hatch_counter + 1) * 256).toLocaleString()} {t.steps})
                  </span>
                </>
              ) : (
                "—"
              )}
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}

function StatsTab({ pokemon, typeColor }) {
  const total = pokemon.stats.reduce((sum, s) => sum + s.base_stat, 0);
  return (
    <div className="tab-content">
      <table className="data-table stats-table">
        <tbody>
          {pokemon.stats.map((s) => (
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
            </tr>
          ))}
          <tr>
            <td className="stat-label">TOT</td>
            <td className="stat-num">{String(total).padStart(3, "0")}</td>
            <td />
          </tr>
        </tbody>
      </table>
    </div>
  );
}

function PokemonDetail({ pokemon, onClose }) {
  const { t } = useLanguage();
  const [tab, setTab] = useState("about");
  const [species, setSpecies] = useState(null);
  const [shiny, setShiny] = useState(false);
  const [pokeballX, setPokeballX] = useState(null);
  const tabRefAbout = useRef(null);
  const tabRefStats = useRef(null);
  const tabRefEvolution = useRef(null);
  const tabRefs = {
    about: tabRefAbout,
    stats: tabRefStats,
    evolution: tabRefEvolution,
  };
  const tabsRef = useRef(null);

  useEffect(() => {
    fetchPokemonSpecies(pokemon.id)
      .then(setSpecies)
      .catch(() => {});
  }, [pokemon.id]);

  useLayoutEffect(() => {
    const el = tabRefs[tab]?.current;
    const container = tabsRef.current;
    if (el && container) {
      const elRect = el.getBoundingClientRect();
      const containerRect = container.getBoundingClientRect();
      setPokeballX(elRect.left - containerRect.left + elRect.width / 2);
    }
  }, [tab]);

  const primaryType = pokemon.types[0].type.name;
  const typeColor = TYPE_COLORS[primaryType] || "#9DA0AA";
  const name = formatPokemonName(pokemon.name);
  const nameSize = name.length > 10 ? Math.max(20, 32 - (name.length - 10) * 1.75) : 32;

  return (
    <div className="pd-overlay">
      <div className="pd-container">
        <div className="pd-header" style={{ backgroundColor: typeColor }}>
          <button className="pd-back" onClick={onClose}>
            <BackArrow />
          </button>
          <svg
            className="pd-name-bg"
            width="100%"
            height="110"
            xmlns="http://www.w3.org/2000/svg"
          >
            <defs>
              <linearGradient id="stroke-grad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="white" stopOpacity="0.30" />
                <stop offset="76.04%" stopColor="white" stopOpacity="0" />
              </linearGradient>
            </defs>
            <text
              x="50%"
              y="90"
              textAnchor="middle"
              fill="none"
              stroke="url(#stroke-grad)"
              strokeWidth="2"
              fontFamily="SF Pro Display, sans-serif"
              fontSize="100"
              fontWeight="700"
            >
              {name.toUpperCase()}
            </text>
          </svg>

          <div className="pd-hero">
            <button className={`pd-shiny-btn${shiny ? " active" : ""}`} onClick={() => setShiny((s) => !s)}>
              <ShinyIcon />
            </button>
            <div className="pd-image-wrap">
              <CircleDetail className="pd-circle" />
              <img
                className="pd-image"
                src={shiny
                  ? pokemon.sprites.other["official-artwork"].front_shiny
                  : pokemon.sprites.other["official-artwork"].front_default}
                alt={name}
              />
            </div>
            <div className="pd-info">
              <span className="pd-number">
                #{String(pokemon.id).padStart(3, "0")}
              </span>
              <h2 className="pd-name" style={{ '--name-size': `${nameSize}px` }}>{name}</h2>
              <div className="pd-types">
                {pokemon.types.map((t) => (
                  <TypeBadge key={t.type.name} type={t.type.name} />
                ))}
              </div>
            </div>
            <PatternDetail className="pd-pattern" />
          </div>
        </div>
        <div className="pd-tabs-wrapper" style={{ backgroundColor: typeColor }}>
          <div className="pd-tabs" ref={tabsRef}>
            <TabPokeball
              className="pd-tab-pokeball"
              style={pokeballX !== null ? { left: pokeballX } : {}}
            />
            {["about", "stats", "evolution"].map((key) => (
              <button
                key={key}
                ref={tabRefs[key]}
                className={`pd-tab ${tab === key ? "active" : ""}`}
                onClick={() => setTab(key)}
              >
                {{ about: t.tabAbout, stats: t.tabStats, evolution: t.tabEvolution }[key]}
              </button>
            ))}
          </div>
        </div>
        <div className="pd-body">
          {tab === "about" && <AboutTab pokemon={pokemon} species={species} t={t} />}
          {tab === "stats" && (
            <StatsTab pokemon={pokemon} typeColor={typeColor} />
          )}
          {tab === "evolution" && (
            <div className="tab-content">
              <p>{t.evolutionSoon}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default PokemonDetail;
