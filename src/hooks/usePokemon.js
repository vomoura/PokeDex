import { useState, useEffect, useCallback, useRef } from 'react'
import { fetchPokemonList, fetchPokemonDetails } from '../services/api'

const BATCH_SIZE = 50

const GEN_RANGES = [
  [1, 151],
  [152, 251],
  [252, 386],
  [387, 493],
  [494, 649],
  [650, 721],
  [722, 809],
  [810, 905],
  [906, 1025],
]

function getTargetIds(selectedGens, filters, sortBy) {
  let min = 1, max = 1025

  if (filters?.rangeMin) min = Math.max(min, filters.rangeMin)
  if (filters?.rangeMax) max = Math.min(max, filters.rangeMax)

  let ids = []

  if (selectedGens?.length > 0) {
    for (const g of selectedGens) {
      const [gMin, gMax] = GEN_RANGES[g]
      const start = Math.max(gMin, min)
      const end = Math.min(gMax, max)
      for (let i = start; i <= end; i++) ids.push(i)
    }
  } else {
    for (let i = min; i <= max; i++) ids.push(i)
  }

  if (sortBy === 'highest') {
    ids.sort((a, b) => b - a)
  } else {
    ids.sort((a, b) => a - b)
  }

  return ids
}

function getCacheKey(selectedGens, filters, sortBy) {
  return JSON.stringify({
    gens: selectedGens,
    range: [filters?.rangeMin, filters?.rangeMax],
    sort: sortBy,
  })
}

export const usePokemon = (selectedGens = [], filters = {}, sortBy = 'smallest') => {
  const [pokemon, setPokemon] = useState([])
  const [loading, setLoading] = useState(true)
  const [loadingMore, setLoadingMore] = useState(false)
  const [hasMore, setHasMore] = useState(true)
  const offsetRef = useRef(0)
  const loadingRef = useRef(false)
  const cacheKeyRef = useRef('')
  const targetIdsRef = useRef([])
  const isAlpha = sortBy === 'az' || sortBy === 'za'

  useEffect(() => {
    const newKey = getCacheKey(selectedGens, filters, sortBy)
    if (newKey === cacheKeyRef.current) return

    cacheKeyRef.current = newKey
    targetIdsRef.current = getTargetIds(selectedGens, filters, sortBy)
    offsetRef.current = 0
    loadingRef.current = false
    setPokemon([])
    setHasMore(true)
    setLoading(true)
  }, [selectedGens, filters, sortBy])

  const loadBatch = useCallback(async () => {
    if (loadingRef.current || !hasMore) return
    loadingRef.current = true
    const isFirst = pokemon.length === 0
    isFirst ? setLoading(true) : setLoadingMore(true)

    try {
      const ids = targetIdsRef.current

      if (isAlpha) {
        // Load all at once for alphabetical sort
        const start = offsetRef.current
        const remaining = ids.slice(start)
        if (!remaining.length) { setHasMore(false); return }

        // Load in parallel chunks to avoid too many concurrent requests
        const allDetails = []
        for (let i = 0; i < remaining.length; i += BATCH_SIZE) {
          const chunk = remaining.slice(i, i + BATCH_SIZE)
          const details = await Promise.all(chunk.map(id => fetchPokemonDetails(id)))
          allDetails.push(...details)
        }
        const sorted = allDetails.sort((a, b) =>
          sortBy === 'az' ? a.name.localeCompare(b.name) : b.name.localeCompare(a.name)
        )
        setPokemon(sorted)
        offsetRef.current = ids.length
        setHasMore(false)
      } else {
        const start = offsetRef.current
        const batch = ids.slice(start, start + BATCH_SIZE)
        if (!batch.length) { setHasMore(false); return }

        const details = await Promise.all(batch.map(id => fetchPokemonDetails(id)))
        setPokemon(prev => [...prev, ...details])
        offsetRef.current = start + BATCH_SIZE
        if (start + BATCH_SIZE >= ids.length) setHasMore(false)
      }
    } catch (error) {
      console.error('Erro ao carregar Pokémon:', error)
    } finally {
      setLoading(false)
      setLoadingMore(false)
      loadingRef.current = false
    }
  }, [hasMore, pokemon.length, isAlpha, sortBy])

  useEffect(() => {
    if (loading && pokemon.length === 0 && hasMore) loadBatch()
  }, [loading, pokemon.length, hasMore, loadBatch])

  return { pokemon, loading, loadingMore, hasMore, loadMore: loadBatch }
}
