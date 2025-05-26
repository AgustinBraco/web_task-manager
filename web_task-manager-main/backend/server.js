import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import tasksRouter from './routes/tasks.js'
import { setupDatabase } from './db.js'
import noteRoutes from './routes/notes.js'



dotenv.config()

const app = express()
const PORT = process.env.PORT || 3001

app.use(cors())
app.use(express.json({ limit: '20mb' }))
app.use('/tasks', tasksRouter)
app.use('/notes', noteRoutes)

setupDatabase().then(() => {
    app.listen(PORT, () => {
        console.log(`Servidor escuchando en http://localhost:${PORT}`)
    })
})
