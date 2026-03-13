import { useState } from 'react'
import generationIcon from '../../assets/icons/Generation.svg'
import sortIcon from '../../assets/icons/Sort.svg'
import filterIcon from '../../assets/icons/Filter.svg'
import GenerationMenu from '../GenerationMenu/GenerationMenu'

function HeaderButtons() {
  const [showGen, setShowGen] = useState(false)
  const [selectedGen, setSelectedGen] = useState(null)

  return (
    <>
      <div className="header-top">
        <button className="header-btn" onClick={() => setShowGen(true)}>
          <img src={generationIcon} alt="Generation" />
        </button>
        <button className="header-btn"><img src={sortIcon} alt="Sort" /></button>
        <button className="header-btn"><img src={filterIcon} alt="Filter" /></button>
      </div>
      {showGen && (
        <GenerationMenu
          selected={selectedGen}
          onSelect={i => setSelectedGen(i)}
          onClose={() => setShowGen(false)}
        />
      )}
    </>
  )
}

export default HeaderButtons
