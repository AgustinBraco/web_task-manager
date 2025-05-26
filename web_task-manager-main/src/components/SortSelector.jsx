import { useAppContext } from '../context/AppContext.jsx'

export const SortSelector = () => {
    const { sortBy, setSortBy } = useAppContext()

    return (
        <select
            data-cy="sort-select"
            className="bar-item"
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
        >
            <option value="default">Orden original</option>
            <option value="priority">Prioridad</option>
            <option value="date">Fecha</option>
            <option value="completed">Estado</option>
        </select>
    )
}
