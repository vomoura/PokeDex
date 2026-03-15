import { useState, useEffect } from 'react'
import generationIcon from '../../../assets/icons/Generation.svg'
import sortIcon from '../../../assets/icons/Sort.svg'
import filterIcon from '../../../assets/icons/Filter.svg'
import languageIcon from '../../../assets/icons/Language.svg'
import GenerationMenu from './GenerationMenu/GenerationMenu'
import SortMenu from './SortMenu/SortMenu'
import FilterMenu from './FilterMenu/FilterMenu'
import { useLanguage } from '../../../context/LanguageContext'

function HeaderButtons({ sortBy, onSortChange, filters, onFilterChange, selectedGens, onGensChange }) {
  const { lang, toggle } = useLanguage()
  const [showGen, setShowGen] = useState(false)
  const [showSort, setShowSort] = useState(false)
  const [showFilter, setShowFilter] = useState(false)

  const menuOpen = showGen || showSort || showFilter

  useEffect(() => {
    document.documentElement.style.overflowY = menuOpen ? 'hidden' : ''
    return () => { document.documentElement.style.overflowY = '' }
  }, [menuOpen])

  return (
    <>
      <button className="header-btn lang-btn" onClick={toggle}>
        <img src={languageIcon} alt="Language" />
        <span className="lang-label">{lang === 'en' ? 'EN' : 'PT'}</span>
      </button>
      <div className="header-top">
        <button className="header-btn" onClick={() => setShowGen(true)}>
          <img src={generationIcon} alt="Generation" />
        </button>
        <button className="header-btn" onClick={() => setShowSort(true)}>
          <img src={sortIcon} alt="Sort" />
        </button>
        <button className="header-btn" onClick={() => setShowFilter(true)}>
          <img src={filterIcon} alt="Filter" />
        </button>
      </div>
      {showGen && (
        <GenerationMenu
          selected={selectedGens}
          onApply={onGensChange}
          onClose={() => setShowGen(false)}
        />
      )}
      {showSort && (
        <SortMenu
          selected={sortBy}
          onSelect={onSortChange}
          onClose={() => setShowSort(false)}
        />
      )}
      {showFilter && (
        <FilterMenu
          filters={filters}
          onApply={onFilterChange}
          onClose={() => setShowFilter(false)}
        />
      )}
    </>
  )
}

export default HeaderButtons
