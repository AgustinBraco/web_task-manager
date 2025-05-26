import { useAppContext } from '../context/AppContext.jsx'

export const Search = () => {
    const { searchTerm, setSearchTerm } = useAppContext()

    return (
        <input
            data-cy="search-input"
            className="bar-item"
            type="text"
            placeholder="Buscar tareas..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
        />
    )
}
