import express from 'express'
import { openDb } from '../db.js'

const router = express.Router()

// GET nota por tarea
router.get('/:task_id', async (req, res) => {
    const db = await openDb()
    const { task_id } = req.params
    const note = await db.get('SELECT * FROM task_notes WHERE task_id = ?', [task_id])
    res.json({ data: note || null })
})

// POST crear o actualizar nota
router.post('/:task_id', async (req, res) => {
    const db = await openDb()
    const { task_id } = req.params
    const { text, image } = req.body

    const existing = await db.get('SELECT * FROM task_notes WHERE task_id = ?', [task_id])
    if (existing) {
        await db.run(
            'UPDATE task_notes SET text = ?, image = ? WHERE task_id = ?',
            [text, image, task_id]
        )
        res.json({ status: 'updated' })
    } else {
        await db.run(
            'INSERT INTO task_notes (task_id, text, image) VALUES (?, ?, ?)',
            [task_id, text, image]
        )
        res.status(201).json({ status: 'created' })
    }
})

export default router
