import { useState, useEffect } from 'react'
import { Navbar } from '../components'
import { useAppContext } from '../context/AppContext'
import axios from 'axios'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'

export const Board = () => {
    const { data } = useAppContext()
    const [selectedTask, setSelectedTask] = useState(null)
    const [text, setText] = useState('')
    const [imageUrl, setImageUrl] = useState('')
    const [fileBase64, setFileBase64] = useState('')
    const [isEditing, setIsEditing] = useState(false)
    const [presentationMode, setPresentationMode] = useState(false)

    useEffect(() => {
        const loadNote = async () => {
            if (!selectedTask) return
            try {
                const response = await axios.get(`http://localhost:3001/notes/${selectedTask.id}`)
                const note = response.data.data
                setText(note?.text || '')
                setImageUrl(note?.image || '')
                setFileBase64(note?.image || '')
                setIsEditing(false)
            } catch (err) {
                setText('')
                setImageUrl('')
                setFileBase64('')
                setIsEditing(true)
            }
        }
        loadNote()
    }, [selectedTask])

    const handleImageUpload = (e) => {
        const file = e.target.files[0]
        if (!file) return
        const reader = new FileReader()
        reader.onloadend = () => {
            setFileBase64(reader.result)
            setImageUrl(reader.result)
        }
        reader.readAsDataURL(file)
    }

    const handleSave = async () => {
        if (!selectedTask) return
        try {
            await axios.post(`http://localhost:3001/notes/${selectedTask.id}`, {
                text,
                image: fileBase64
            })
            console.log('✅ Nota guardada para tarea:', selectedTask.title)
            setIsEditing(false)
        } catch (err) {
            console.log('❌ Error al guardar nota:', err.message)
        }
    }

    const handleClear = () => {
        setText('')
        setImageUrl('')
        setFileBase64('')
    }

    return (
        <div className="board-view">
            <Navbar />
            <h2 className="page-title">📂 Tablero de tareas</h2>
            <div className="board-container">
                <div className="board-sidebar">
                    <h3>Tareas</h3>
                    <ul className="task-list">
                        {data.map(task => (
                            <li
                                key={task.id}
                                className={selectedTask?.id === task.id ? 'active' : ''}
                                onClick={() => setSelectedTask(task)}
                            >
                                {task.title}
                            </li>
                        ))}
                    </ul>
                </div>

                <div className="board-editor">
                    {selectedTask ? (
                        <div className="editor-content">
                            <h3>{selectedTask.title}</h3>

                            <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
                                <button onClick={() => setPresentationMode(!presentationMode)}>
                                    {presentationMode ? '📝 Volver a editar' : '👁 Modo presentación'}
                                </button>
                            </div>

                            {presentationMode ? (
                                <>
                                    <div className="markdown-preview">
                                        <ReactMarkdown remarkPlugins={[remarkGfm]}>
                                            {text}
                                        </ReactMarkdown>
                                    </div>
                                    {imageUrl && (
                                        <a href={imageUrl} target="_blank" rel="noopener noreferrer">
                                            <img src={imageUrl} alt="preview" className="preview-img" />
                                        </a>
                                    )}
                                </>
                            ) : (
                                <>
                  <textarea
                      rows={10}
                      placeholder="Escribí tus ideas..."
                      value={text}
                      onChange={(e) => setText(e.target.value)}
                      disabled={!isEditing}
                  />

                                    <h4>Vista previa</h4>
                                    <div className="markdown-preview">
                                        <ReactMarkdown remarkPlugins={[remarkGfm]}>
                                            {text}
                                        </ReactMarkdown>
                                    </div>

                                    <input
                                        type="file"
                                        accept="image/*"
                                        onChange={handleImageUpload}
                                        disabled={!isEditing}
                                    />

                                    {imageUrl && (
                                        <img
                                            src={imageUrl}
                                            alt="preview"
                                            className="preview-img"
                                        />
                                    )}

                                    <div style={{ display: 'flex', gap: '1rem', marginTop: '1rem' }}>
                                        {isEditing ? (
                                            <>
                                                <button onClick={handleSave}>Guardar</button>
                                                <button onClick={handleClear}>Limpiar</button>
                                            </>
                                        ) : (
                                            <button onClick={() => setIsEditing(true)}>Editar</button>
                                        )}
                                    </div>
                                </>
                            )}
                        </div>
                    ) : (
                        <p>Seleccioná una tarea para comenzar.</p>
                    )}
                </div>
            </div>
        </div>
    )
}
