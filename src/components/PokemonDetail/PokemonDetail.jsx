import { useState, useEffect, useLayoutEffect, useRef } from "react";
import "./PokemonDetail.css";
import TypeBadge from "../TypeBadge/TypeBadge";
import BackArrow from "../../assets/icons/BackArrow.svg?react";
import CircleDetail from "../../assets/icons/CircleDetail.svg?react";
import PatternDetail from "../../assets/icons/PatternDetail.svg?react";
import ShinyIcon from "../../assets/icons/ShinyIcon.svg?react";
import CryIcon from "../../assets/icons/cryicon.svg?react";
import TabPokeball from "../../assets/icons/TabPokeball.svg?react";
import { fetchPokemonSpecies } from "../../services/api";
import { useLanguage } from "../../context/LanguageContext";
import { formatPokemonName } from "../../utils/formatName";
import About from "./About/About";
import Stats from "./Stats/Stats";
import Evolution from "./Evolution/Evolution";

const TYPE_COLORS = {
  bug: "#8BD674", dark: "#6F6E78", dragon: "#7383B9", electric: "#F2CB55",
  fairy: "#EBA8C3", fighting: "#EB4971", fire: "#FFA756", flying: "#83A2E3",
  ghost: "#8571BE", grass: "#8BBE8A", ground: "#F78551", ice: "#91D8DF",
  normal: "#B5B9C4", poison: "#9F6E97", psychic: "#FF6568", rock: "#D4C294",
  steel: "#4C91B2", water: "#58ABF6",
};

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
            <button className={`pd-button pd-button-shiny${shiny ? " active" : ""}`} onClick={() => setShiny((s) => !s)}>
              <ShinyIcon />
            </button>
            <button className="pd-button pd-button-cry" onClick={() => {
              const url = pokemon.cries?.latest;
              if (url) new Audio(url).play();
            }}>
              <CryIcon />
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
              <h2 className="pd-name" style={{ "--name-size": `${nameSize}px` }}>{name}</h2>
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
          {tab === "about" && <About pokemon={pokemon} species={species} t={t} />}
          {tab === "stats" && <Stats pokemon={pokemon} typeColor={typeColor} />}
          {tab === "evolution" && <Evolution />}
        </div>
      </div>
    </div>
  );
}

export default PokemonDetail;
