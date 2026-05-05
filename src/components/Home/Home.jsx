import { useState, useEffect } from 'react'
import SearchBar from './SearchBar/SearchBar'
import GenerationMenu from './ButtonsMenu/GenerationMenu/GenerationMenu'
import SortMenu from './ButtonsMenu/SortMenu/SortMenu'
import FilterMenu from './ButtonsMenu/FilterMenu/FilterMenu'
import { useLanguage } from '../../context/LanguageContext'
import languageIcon from '../../assets/icons/Language.svg'
import generationIcon from '../../assets/icons/Generation.svg'
import sortIcon from '../../assets/icons/Sort.svg'
import filterIcon from '../../assets/icons/Filter.svg'
import pokeballBg from '../../assets/icons/PokeballBg.svg'
import './Home.css'

function Home({ searchTerm, setSearchTerm, sortBy, onSortChange, filters, onFilterChange, selectedGens, onGensChange, scrollProgress }) {
  const { lang, toggle, t } = useLanguage()
  const [showGen, setShowGen] = useState(false)
  const [showSort, setShowSort] = useState(false)
  const [showFilter, setShowFilter] = useState(false)

  const menuOpen = showGen || showSort || showFilter
  const collapsed = scrollProgress >= 1

  useEffect(() => {
    document.documentElement.style.overflowY = menuOpen ? 'hidden' : ''
    return () => { document.documentElement.style.overflowY = '' }
  }, [menuOpen])

  const headerStyle = { '--scroll-progress': scrollProgress }

  const actionButtons = (
    <>
      <button className="header-btn" onClick={() => setShowGen(true)}>
        <img src={generationIcon} alt="Generation" />
      </button>
      <button className="header-btn" onClick={() => setShowSort(true)}>
        <img src={sortIcon} alt="Sort" />
      </button>
      <button className="header-btn" onClick={() => setShowFilter(true)}>
        <img src={filterIcon} alt="Filter" />
      </button>
    </>
  )

  return (
    <header className={`header${collapsed ? ' header--collapsed' : ''}`} style={headerStyle}>
      <img src={pokeballBg} className="header-pokeball" alt="" />

      {/* Expanded state elements */}
      <button className="header-btn lang-btn" onClick={toggle}>
        <img src={languageIcon} alt="Language" />
        <span className="lang-label">{lang === 'en' ? 'EN' : 'PT'}</span>
      </button>
      <div className="header-top">{actionButtons}</div>

      <div className="header-expandable">
        <h1>{t.title}</h1>
        <p>{t.subtitle}</p>
      </div>
      <SearchBar searchTerm={searchTerm} setSearchTerm={setSearchTerm} className="search-bar--main" />

      {/* Collapsed state bar */}
      <div className="header-collapsed-bar">
        <button className="header-btn" onClick={toggle}>
          <img src={languageIcon} alt="Language" />
          <span className="lang-label">{lang === 'en' ? 'EN' : 'PT'}</span>
        </button>
        <SearchBar searchTerm={searchTerm} setSearchTerm={setSearchTerm} className="search-bar--collapsed" />
        {actionButtons}
      </div>

      {/* Menus (fixed overlays) */}
      {showGen && (
        <GenerationMenu selected={selectedGens} onApply={onGensChange} onClose={() => setShowGen(false)} />
      )}
      {showSort && (
        <SortMenu selected={sortBy} onSelect={onSortChange} onClose={() => setShowSort(false)} />
      )}
      {showFilter && (
        <FilterMenu filters={filters} onApply={onFilterChange} onClose={() => setShowFilter(false)} />
      )}
    </header>
  )
}

export default Home
