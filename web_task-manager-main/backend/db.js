import sqlite3 from 'sqlite3'
import { open } from 'sqlite'

// Abre conexión a la base de datos SQLite
export async function openDb() {
    return open({
        filename: './database.db',
        driver: sqlite3.Database
    })
}

// Crea las tablas si no existen
export async function setupDatabase() {
    const db = await openDb()

    // Tabla principal de tareas
    await db.exec(`
    CREATE TABLE IF NOT EXISTS tasks (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      title TEXT NOT NULL,
      description TEXT,
      date TEXT,
      priority INTEGER,
      completed INTEGER
    )
  `)

    // ✅ Nueva tabla para guardar notas por tarea
    await db.exec(`
    CREATE TABLE IF NOT EXISTS task_notes (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      task_id INTEGER UNIQUE,
      text TEXT,
      image TEXT
    )
  `)
}
