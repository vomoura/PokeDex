import BugIcon from '../../assets/types/Bug.svg?react'
import DarkIcon from '../../assets/types/Dark.svg?react'
import DragonIcon from '../../assets/types/Dragon.svg?react'
import ElectricIcon from '../../assets/types/Electric.svg?react'
import FairyIcon from '../../assets/types/Fairy.svg?react'
import FightingIcon from '../../assets/types/Fighting.svg?react'
import FireIcon from '../../assets/types/Fire.svg?react'
import FlyingIcon from '../../assets/types/Flying.svg?react'
import GhostIcon from '../../assets/types/Ghost.svg?react'
import GrassIcon from '../../assets/types/Grass.svg?react'
import GroundIcon from '../../assets/types/Ground.svg?react'
import IceIcon from '../../assets/types/Ice.svg?react'
import NormalIcon from '../../assets/types/Normal.svg?react'
import PoisonIcon from '../../assets/types/Poison.svg?react'
import PsychicIcon from '../../assets/types/Psychic.svg?react'
import RockIcon from '../../assets/types/Rock.svg?react'
import SteelIcon from '../../assets/types/Steel.svg?react'
import WaterIcon from '../../assets/types/Water.svg?react'
import './TypeBadge.css'

const TYPE_CONFIG = {
  bug:      { Icon: BugIcon,      color: '#8CB230' },
  dark:     { Icon: DarkIcon,     color: '#58575F' },
  dragon:   { Icon: DragonIcon,   color: '#0F6AC0' },
  electric: { Icon: ElectricIcon, color: '#EED535' },
  fairy:    { Icon: FairyIcon,    color: '#ED6EC7' },
  fighting: { Icon: FightingIcon, color: '#D04164' },
  fire:     { Icon: FireIcon,     color: '#FD7D24' },
  flying:   { Icon: FlyingIcon,   color: '#748FC9' },
  ghost:    { Icon: GhostIcon,    color: '#556AAE' },
  grass:    { Icon: GrassIcon,    color: '#62B957' },
  ground:   { Icon: GroundIcon,   color: '#DD7748' },
  ice:      { Icon: IceIcon,      color: '#61CEC0' },
  normal:   { Icon: NormalIcon,   color: '#9DA0AA' },
  poison:   { Icon: PoisonIcon,   color: '#A552CC' },
  psychic:  { Icon: PsychicIcon,  color: '#EA5D60' },
  rock:     { Icon: RockIcon,     color: '#BAAB82' },
  steel:    { Icon: SteelIcon,    color: '#417D9A' },
  water:    { Icon: WaterIcon,    color: '#4A90DA' },
}

function TypeBadge({ type }) {
  const config = TYPE_CONFIG[type] || { Icon: null, color: '#9DA0AA' }
  const { Icon } = config
  return (
    <span className="type-badge" style={{ backgroundColor: config.color }}>
      {Icon && <Icon className="type-icon" />}
      {type}
    </span>
  )
}

export default TypeBadge
