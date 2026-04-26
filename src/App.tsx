import { useState, useEffect } from 'react'
import './App.css'
import { obtenerTareas, crearTarea } from './api/client'
import DataTable from './components/DataTable'
import { diasEntreFechas } from './utils/date'

type Tarea = {
  id: number
  titulo: string
}

function App() {
  const [tareas, setTareas] = useState<Tarea[]>([])
  const [nuevoTitulo, setNuevoTitulo] = useState<string>('')
  const [edicion, setEdicion] = useState<Partial<Tarea> | null>(null)

  useEffect(() => {
    async function cargarTareas() {
      const data = await obtenerTareas()
      setTareas(data.datos || [])
    }

    cargarTareas()
  }, [])

  const manana = new Date()
  manana.setDate(manana.getDate() + 1)

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

      <DataTable
        data={tareas}
        columns={[
          { key: 'id', label: 'ID' },
          { key: 'titulo', label: 'Título' }
        ]}
      />

      <button
        onClick={() => {
          if (tareas.length > 0) {
            setEdicion({ ...tareas[0] })
          }
        }}
      >
        Editar primera tarea
      </button>

      {edicion && (
        <div>
          <h3>Editando:</h3>
          <input
            value={edicion.titulo || ''}
            onChange={(e) =>
              setEdicion({ ...edicion, titulo: e.target.value })
            }
          />
        </div>
      )}

      <p>
        Días entre hoy y mañana:{' '}
        {diasEntreFechas(new Date(), manana)}
      </p>
    </div>
  )
}

export default App