import express from 'express'
import { openDb } from '../db.js'

const router = express.Router()

// GET todas las tareas
router.get('/', async (req, res) => {
    const db = await openDb()
    const tasks = await db.all('SELECT * FROM tasks')
    res.json({ data: tasks })
})

// POST nueva tarea
router.post('/', async (req, res) => {
    const { title, description, date, priority, completed } = req.body
    const db = await openDb()
    await db.run(
        'INSERT INTO tasks (title, description, date, priority, completed) VALUES (?, ?, ?, ?, ?)',
        [title, description, date, priority, completed]
    )
    res.status(201).json({ status: 'created' })
})

// PUT actualizar tarea
router.put('/:id', async (req, res) => {
    const { id } = req.params
    const { title, description, date, priority, completed } = req.body
    const db = await openDb()
    await db.run(
        'UPDATE tasks SET title = ?, description = ?, date = ?, priority = ?, completed = ? WHERE id = ?',
        [title, description, date, priority, completed, id]
    )
    res.json({ status: 'updated' })
})

// DELETE eliminar tarea
router.delete('/:id', async (req, res) => {
    const { id } = req.params
    const db = await openDb()
    await db.run('DELETE FROM tasks WHERE id = ?', [id])
    res.json({ status: 'deleted' })
})

export default router
