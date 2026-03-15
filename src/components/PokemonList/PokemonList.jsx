import { useRef, useCallback, useState, useEffect } from 'react'
import { usePokemon } from '../../hooks/usePokemon'
import { fetchPokemonDetails } from '../../services/api'
import PokemonCard from '../PokemonCard/PokemonCard'
import LoadingSpinner from '../LoadingSpinner/LoadingSpinner'
import { useLanguage } from '../../context/LanguageContext'
import './PokemonList.css'

function getHeightCategory(h) {
  if (h < 10) return 'short'
  if (h < 20) return 'medium'
  return 'tall'
}

function getWeightCategory(w) {
  if (w < 100) return 'light'
  if (w < 500) return 'normalw'
  return 'heavy'
}

function applyFilters(list, filters) {
  return list.filter(p => {
    if (filters.types?.length > 0) {
      const pTypes = p.types.map(t => t.type.name)
      if (!filters.types.some(t => pTypes.includes(t))) return false
    }
    if (filters.heights?.length > 0) {
      if (!filters.heights.includes(getHeightCategory(p.height))) return false
    }
    if (filters.weights?.length > 0) {
      if (!filters.weights.includes(getWeightCategory(p.weight))) return false
    }
    return true
  })
}

function NoResults() {
  const { t } = useLanguage()
  return (
    <div className="no-results">
      <h2>{t.noResultsTitle}</h2>
      <p>{t.noResultsTip}</p>
      <ul>
        {t.noResultsTips.map((tip, i) => <li key={i}>{tip}</li>)}
      </ul>
    </div>
  )
}

function PokemonList({ searchTerm, sortBy, filters, selectedGens, onSelectPokemon }) {
  const { pokemon, loading, loadingMore, hasMore, loadMore } = usePokemon(selectedGens, filters, sortBy)
  const observer = useRef()
  const [searchResult, setSearchResult] = useState(null)
  const [searching, setSearching] = useState(false)

  useEffect(() => {
    if (!searchTerm.trim()) {
      setSearchResult(null)
      return
    }

    const timer = setTimeout(async () => {
      const found = pokemon.filter(p =>
        p.name.toLowerCase().includes(searchTerm.toLowerCase())
      )
      if (found.length > 0) {
        setSearchResult(found)
        return
      }

      setSearching(true)
      try {
        const details = await fetchPokemonDetails(searchTerm.toLowerCase().trim())
        if (details?.id) {
          setSearchResult([details])
        } else {
          setSearchResult([])
        }
      } catch {
        setSearchResult([])
      } finally {
        setSearching(false)
      }
    }, 400)

    return () => clearTimeout(timer)
  }, [searchTerm, pokemon])

  const lastCardRef = useCallback(node => {
    if (loadingMore) return
    if (observer.current) observer.current.disconnect()
    observer.current = new IntersectionObserver(entries => {
      if (entries[0].isIntersecting && hasMore) loadMore()
    })
    if (node) observer.current.observe(node)
  }, [loadingMore, hasMore, loadMore])

  if (loading || searching) return <LoadingSpinner />

  if (searchTerm.trim() && searchResult !== null) {
    if (searchResult.length === 0) return <NoResults />
    return (
      <div className="pokemon-list">
        {searchResult.map(p => (
          <div key={p.id}>
            <PokemonCard pokemon={p} onClick={() => onSelectPokemon(p)} />
          </div>
        ))}
      </div>
    )
  }

  const filteredPokemon = applyFilters(
    pokemon.filter(p => !searchTerm.trim() || p.name.toLowerCase().includes(searchTerm.toLowerCase())),
    filters
  )

  if (filteredPokemon.length === 0 && !loadingMore) return <NoResults />

  return (
    <div className="pokemon-list">
      {filteredPokemon.map((p, i) => (
        <div key={p.id} ref={i === filteredPokemon.length - 1 ? lastCardRef : null}>
          <PokemonCard pokemon={p} onClick={() => onSelectPokemon(p)} />
        </div>
      ))}
      {loadingMore && <LoadingSpinner />}
    </div>
  )
}

export default PokemonList
