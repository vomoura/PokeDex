import { useState, useEffect } from 'react'
import { fetchPokemonList, fetchPokemonDetails } from '../services/api'

export const usePokemon = () => {
  const [pokemon, setPokemon] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const loadPokemon = async () => {
      try {
        const data = await fetchPokemonList()
        const detailedPokemon = await Promise.all(
          data.results.map(async (p) => {
            const details = await fetchPokemonDetails(p.name)
            return details
          })
        )
        setPokemon(detailedPokemon)
      } catch (error) {
        console.error('Erro ao carregar Pokémon:', error)
      } finally {
        setLoading(false)
      }
    }
    loadPokemon()
  }, [])

  return { pokemon, loading }
}
