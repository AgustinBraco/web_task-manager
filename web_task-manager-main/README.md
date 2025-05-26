<img width=100% src="https://capsule-render.vercel.app/api?type=waving&color=d9d9d9&height=120&section=header"/>

# Task manager

<div>
Web frontend para gestionar tareas de forma simple e intuitiva. Permite crear, editar, completar y borrar tareas desde una interfaz responsive.
</div>

<hr>

<div>
<h4>Lenguaje y entorno</h4>
<img alt="Javascript" src="https://img.shields.io/badge/Javascript-808080?style=for-the-badge&logo=javascript&logoColor=d9d9d9">
<img alt="Vite" src="https://img.shields.io/badge/Vite-808080?style=for-the-badge&logo=vite&logoColor=d9d9d9">

<h4>Framework</h4>
<img alt="React" src="https://img.shields.io/badge/React-808080?style=for-the-badge&logo=react&logoColor=d9d9d9">

<h4>Herramientas</h4>
<img alt="HTML" src="https://img.shields.io/badge/HTML-808080?style=for-the-badge&logo=html5&logoColor=d9d9d9">
<img alt="CSS" src="https://img.shields.io/badge/CSS-808080?style=for-the-badge&logo=css3&logoColor=d9d9d9">
<img alt="Sass" src="https://img.shields.io/badge/Sass-808080?style=for-the-badge&logo=sass&logoColor=d9d9d9">
<img alt="Dotenv" src="https://img.shields.io/badge/Dotenv-808080?style=for-the-badge&logo=dotenv&logoColor=d9d9d9">
<img alt="Axios" src="https://img.shields.io/badge/Axios-808080?style=for-the-badge&logo=axios&logoColor=d9d9d9">

<h4>Testing</h4>
<img alt="Cypress" src="https://img.shields.io/badge/Cypress-808080?style=for-the-badge&logo=cypress&logoColor=d9d9d9">
<img alt="Vitest" src="https://img.shields.io/badge/Vitest-808080?style=for-the-badge&logo=vitest&logoColor=d9d9d9">

<h4>Control de versiones</h4>
<img alt="Git" src="https://img.shields.io/badge/Git-808080?style=for-the-badge&logo=git&logoColor=d9d9d9">
<img alt="Github" src="https://img.shields.io/badge/Github-808080?style=for-the-badge&logo=github&logoColor=d9d9d9">

</div>

<hr>
## 🧠 Funcionalidades implementadas

Este gestor fue ampliado para incluir:

### ✅ Gestión tradicional de tareas
- Crear, editar, completar y eliminar tareas
- Guardado local o conectado a backend (SQLite)

### 🗂 Tablero de desarrollo (tipo Joplin)
- Vista `/board` donde seleccionás una tarea
- Permite redactar ideas en **Markdown**
- Subir y visualizar imágenes desde tu dispositivo
- Vista editable o presentación (`Modo presentación`)
- Botón “Limpiar” para borrar contenido

### 📊 Módulo de resumen visual
- Nueva vista `/summary` con métricas globales
- Muestra total de tareas, activas, completas, con nota e imagen
- Gráficos dinámicos hechos con `recharts`:
    - Gráfico circular (pie) activo vs completadas
    - Gráfico de barras para tareas con/sin contenido

### 🔐 Login mejorado
- Campos grandes, centrado vertical, ícono para mostrar contraseña
- Feedback visual por errores
- Guarda el último correo usado

### 🎨 Mejora visual general
- Tipografía más grande y accesible
- Navbar con más altura y estilo
- Títulos con íconos contextuales: `🗂 Tablero`, `📊 Resumen`, etc.
- Diseño responsive mejorado

---

## 📁 Backend (SQLite + Express)

- Guardado de notas (`text` + `image`) por `taskId`
- Middleware para admitir imágenes grandes
- Rutas:  
  `GET /notes/:id`  
  `POST /notes/:id`

---

## 📌 Vistas disponibles

- `/login`: acceso a la app
- `/tasks`: gestor de tareas (clásico)
- `/board`: desarrollador de notas por tarea
- `/summary`: resumen general visual

---
<div>
<p><b>¡Gracias por tu visita!</b></p>  
</div>

<img width=100% src="https://capsule-render.vercel.app/api?type=waving&color=d9d9d9&height=120&section=footer"/>
