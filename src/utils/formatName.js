const SPECIAL_NAMES = {
  'nidoran-f': 'Nidoran♀',
  'nidoran-m': 'Nidoran♂',
}

const PARADOX_POKEMON = new Set([
  'great-tusk', 'scream-tail', 'brute-bonnet', 'flutter-mane',
  'slither-wing', 'sandy-shocks', 'iron-treads', 'iron-bundle',
  'iron-hands', 'iron-jugulis', 'iron-moth', 'iron-thorns',
  'roaring-moon', 'iron-valiant', 'walking-wake', 'iron-leaves',
  'gouging-fire', 'raging-bolt', 'iron-boulder', 'iron-crown',
])

// Pokemon with natural hyphens — keep as-is
const NATURAL_HYPHEN = new Set([
  'mr-mime', 'ho-oh', 'mime-jr', 'porygon-z', 'type-null',
  'jangmo-o', 'hakamo-o', 'kommo-o',
  'tapu-koko', 'tapu-lele', 'tapu-bulu', 'tapu-fini',
  'mr-rime', 'wo-chien', 'chien-pao', 'ting-lu', 'chi-yu',
])

// Form suffixes to strip (matches end of name after base)
const FORM_SUFFIXES = /-(mega(-[xy])?|gmax|alola|galar|hisui|paldea(-.+)?|primal|origin|altered|normal|attack|defense|speed|plant|sandy|trash|sky|land|incarnate|therian|ordinary|resolute|aria|pirouette|male|female|shield|blade|average|small|large|super|50|10|complete|baile|pom-pom|pau|sensu|midday|midnight|dusk|solo|school|red-meteor|orange-meteor|yellow-meteor|green-meteor|blue-meteor|indigo-meteor|violet-meteor|red|orange|yellow|green|blue|indigo|violet|disguised|busted|totem(-.+)?|amped|low-key|ice|noice|full-belly|hangry|single-strike|rapid-strike|zero|hero|curly|droopy|stretchy|two-segment|three-segment|family-of-four|family-of-three|green-plumage|blue-plumage|yellow-plumage|white-plumage|own-tempo|starter|battle-bond|ash|cosplay|rock-star|belle|pop-star|phd|libre|original-cap|hoenn-cap|sinnoh-cap|unova-cap|kalos-cap|alola-cap|partner-cap|world-cap|eternal|black|white|10-power-construct|50-power-construct|red-striped|blue-striped|white-striped|standard|zen|galar-standard|galar-zen|crowned|dada|eternamax|unbound|bloodmoon|cornerstone-mask|hearthflame-mask|wellspring-mask|stellar|terastal|roaming|shadow|original-mega|mega-z|aquatic-mode|drive-mode|glide-mode|low-power-mode|gorging|gulping|gliding-build|limited-build|sprinting-build|swimming-build|amped-gmax|low-key-gmax|single-strike-gmax|rapid-strike-gmax|curly-mega|droopy-mega|stretchy-mega|paldea-aqua-breed|paldea-blaze-breed|paldea-combat-breed)$/

export function formatPokemonName(name) {
  if (SPECIAL_NAMES[name]) return SPECIAL_NAMES[name]
  if (PARADOX_POKEMON.has(name)) {
    return name.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ')
  }
  if (NATURAL_HYPHEN.has(name)) {
    return name.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join('-')
  }

  // Strip form suffix for alternate forms
  const base = name.replace(FORM_SUFFIXES, '')
  return base.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join('-')
}
