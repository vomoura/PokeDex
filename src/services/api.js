const API_URL = 'https://pokeapi.co/api/v2'

export const fetchPokemonList = async (limit = 151) => {
  const response = await fetch(`${API_URL}/pokemon?limit=${limit}`)
  return response.json()
}

export const fetchPokemonDetails = async (nameOrId) => {
  const response = await fetch(`${API_URL}/pokemon/${nameOrId}`)
  return response.json()
}

export const fetchPokemonSpecies = async (id) => {
  const response = await fetch(`${API_URL}/pokemon-species/${id}`)
  return response.json()
}
