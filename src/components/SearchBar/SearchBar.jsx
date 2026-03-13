import './SearchBar.css'
import SearchIcon from '../../assets/icons/Search.svg'

function SearchBar({ searchTerm, setSearchTerm }) {
  return (
    <div className="search-bar">
      <div className="search-bar-inner">
        <img src={SearchIcon} className="search-icon" alt="" />
        <input
          type="text"
          placeholder="What Pokémon are you looking for?"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>
    </div>
  )
}

export default SearchBar
