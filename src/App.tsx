import { useState, useEffect } from 'react'
import './App.css'
import { obtenerTareas, crearTarea, eliminarTarea } from './api/client'

type Tarea = {
  id: number
  titulo: string
}

function App() {
  const [tareas, setTareas] = useState<Tarea[]>([])
  const [nuevoTitulo, setNuevoTitulo] = useState<string>('')

  useEffect(() => {
    async function cargarTareas() {
      const data = await obtenerTareas()
      setTareas(data.datos || [])
    }

    cargarTareas()
  }, [])

  return (
    <div>
      <h1>TaskFlow</h1>

      <input
        type="text"
        placeholder="Nueva tarea"
        value={nuevoTitulo}
        onChange={(e) => setNuevoTitulo(e.target.value)}
      />

      <button
        onClick={async () => {
          if (!nuevoTitulo.trim()) return

          await crearTarea({ titulo: nuevoTitulo })

          const data = await obtenerTareas()
          setTareas(data.datos || [])

          setNuevoTitulo('')
        }}
      >
        Añadir tarea
      </button>

      <ul>
        {tareas.map((tarea) => (
          <li key={tarea.id}>
            {tarea.titulo}

            <button
              onClick={async () => {
                await eliminarTarea(tarea.id)

                const data = await obtenerTareas()
                setTareas(data.datos || [])
              }}
            >
              ❌
            </button>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default App