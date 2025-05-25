import { Navbar, Tasks, Modal, Add, Bar, Search, SortSelector } from '../components'
import { useAppContext } from '../context/AppContext'

export const Dashboard = () => {
    const { logout } = useAppContext()

    return (
        <div className="dashboard">
            <Navbar />
            <div className="bar" style={{ justifyContent: 'center', flexWrap: 'wrap', gap: '0.5rem' }}>
                <Search />
                <SortSelector />
            </div>

            <Bar />
            <Tasks />
            <Modal />
            <Add />
        </div>
    )
}
