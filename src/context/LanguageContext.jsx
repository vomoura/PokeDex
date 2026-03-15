import { createContext, useContext, useState } from 'react'

const translations = {
  en: {
    title: 'Pokédex',
    subtitle: 'Search for Pokémon by name or using the National Pokédex number.',
    searchPlaceholder: 'What Pokémon are you looking for?',
    noResultsTitle: "We couldn't find any Pokémon!",
    noResultsTip: 'Give these tips a try to refine your search:',
    noResultsTips: ['Use fewer search filters', 'Try using one Pokémon type at a time', 'Include different body dimensions'],
    sortTitle: 'Sort',
    sortSubtitle: 'Sort Pokémon alphabetically or by National Pokédex number!',
    sortOptions: { smallest: 'Smallest number first', highest: 'Highest number first', az: 'A-Z', za: 'Z-A' },
    filterTitle: 'Filters',
    filterSubtitle: 'Use advanced search to explore Pokémon by type, weakness, height and more!',
    filterTypes: 'Types',
    filterWeaknesses: 'Weaknesses',
    filterHeights: 'Heights',
    filterWeights: 'Weights',
    filterRange: 'Number Range',
    reset: 'Reset',
    apply: 'Apply',
    genTitle: 'Generations',
    genSubtitle: 'Use search for generations to explore your Pokémon!',
    height: 'Height',
    weight: 'Weight',
    stats: 'Stats',
  },
  pt: {
    title: 'Pokédex',
    subtitle: 'Busque Pokémon pelo nome ou pelo número da Pokédex Nacional.',
    searchPlaceholder: 'Qual Pokémon você está procurando?',
    noResultsTitle: 'Não achamos nenhum Pokémon!',
    noResultsTip: 'Tente essas dicas para refinar sua busca:',
    noResultsTips: ['Use menos filtros de busca', 'Tente usar um tipo de Pokémon por vez', 'Inclua diferentes dimensões corporais'],
    sortTitle: 'Ordenar',
    sortSubtitle: 'Ordene os Pokémon alfabeticamente ou pelo número da Pokédex Nacional!',
    sortOptions: { smallest: 'Menor número primeiro', highest: 'Maior número primeiro', az: 'A-Z', za: 'Z-A' },
    filterTitle: 'Filtros',
    filterSubtitle: 'Use a busca avançada para explorar Pokémon por tipo, fraqueza, altura e mais!',
    filterTypes: 'Tipos',
    filterWeaknesses: 'Fraquezas',
    filterHeights: 'Alturas',
    filterWeights: 'Pesos',
    filterRange: 'Intervalo de Número',
    reset: 'Resetar',
    apply: 'Aplicar',
    genTitle: 'Gerações',
    genSubtitle: 'Use a busca por gerações para explorar seus Pokémon!',
    height: 'Altura',
    weight: 'Peso',
    stats: 'Estatísticas',
  },
}

const LanguageContext = createContext()

export function LanguageProvider({ children }) {
  const [lang, setLang] = useState('en')
  const t = translations[lang]
  const toggle = () => setLang(l => l === 'en' ? 'pt' : 'en')
  return (
    <LanguageContext.Provider value={{ lang, t, toggle }}>
      {children}
    </LanguageContext.Provider>
  )
}

export function useLanguage() {
  return useContext(LanguageContext)
}
