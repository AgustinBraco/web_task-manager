import { useAppContext } from '../context/AppContext'
import { Navbar } from '../components'
import {
    PieChart, Pie, Cell, Legend,
    BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer
} from 'recharts'

export const Summary = () => {
    const { data } = useAppContext()

    const activeCount = data.filter(t => t.completed === 0).length
    const completedCount = data.filter(t => t.completed === 1).length

    const withNote = data.filter(t => t.note?.text).length
    const withoutNote = data.length - withNote

    const withImage = data.filter(t => t.note?.image).length
    const withoutImage = data.length - withImage

    const pieData = [
        { name: 'Activas', value: activeCount },
        { name: 'Completadas', value: completedCount }
    ]

    const COLORS = ['#0088FE', '#00C49F']

    const barData = [
        {
            name: 'Notas',
            ConNota: withNote,
            SinNota: withoutNote
        },
        {
            name: 'Imágenes',
            ConImagen: withImage,
            SinImagen: withoutImage
        }
    ]

    return (
        <div className="summary-view">
            <Navbar />
            <h2 className="page-title">📊 Resumen general</h2>

            <div style={{ padding: '2rem' }}>
                <p><strong>Total de tareas:</strong> {data.length}</p>
                <p><strong>Tareas activas:</strong> {activeCount}</p>
                <p><strong>Tareas completadas:</strong> {completedCount}</p>
                <p><strong>Tareas con notas:</strong> {withNote}</p>
                <p><strong>Tareas con imágenes:</strong> {withImage}</p>

                <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: '4rem', marginTop: '2rem' }}>
                    <div>
                        <h4>Tareas activas vs completadas</h4>
                        <PieChart width={300} height={300}>
                            <Pie
                                data={pieData}
                                cx="50%"
                                cy="50%"
                                outerRadius={100}
                                label
                                dataKey="value"
                            >
                                {pieData.map((entry, index) => (
                                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                ))}
                            </Pie>
                            <Tooltip />
                            <Legend verticalAlign="bottom" />
                        </PieChart>
                    </div>

                    <div>
                        <h4>Tareas con contenido</h4>
                        <ResponsiveContainer width={300} height={300}>
                            <BarChart data={barData}>
                                <XAxis dataKey="name" />
                                <YAxis allowDecimals={false} />
                                <Tooltip />
                                <Legend />
                                <Bar dataKey="ConNota" fill="#82ca9d" />
                                <Bar dataKey="SinNota" fill="#f27c7c" />
                                <Bar dataKey="ConImagen" fill="#8884d8" />
                                <Bar dataKey="SinImagen" fill="#f8b94f" />
                            </BarChart>
                        </ResponsiveContainer>
                    </div>
                </div>
            </div>
        </div>
    )
}
