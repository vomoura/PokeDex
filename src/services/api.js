const API_URL = 'https://pokeapi.co/api/v2'
const translateCache = {}

export const translateText = async (text, targetLang) => {
  const key = `${targetLang}:${text}`
  if (translateCache[key]) return translateCache[key]
  try {
    const res = await fetch(`https://lingva.ml/api/v1/en/${targetLang}/${encodeURIComponent(text)}`)
    const data = await res.json()
    const translated = data.translation || text
    translateCache[key] = translated
    return translated
  } catch {
    return text
  }
}

export const fetchPokemonList = async (limit = 50, offset = 0) => {
  const response = await fetch(`${API_URL}/pokemon?limit=${limit}&offset=${offset}`)
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
