const API_URL = "http://localhost:3000/api/v1/tasks";

export async function obtenerTareas() {
  const respuesta = await fetch(API_URL);
  return respuesta.json();
}

export async function crearTarea(tarea: { titulo: string }) {
  const respuesta = await fetch(API_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(tarea)
  });

  return respuesta.json();
}

export async function eliminarTarea(id: number) {
  const respuesta = await fetch(`${API_URL}/${id}`, {
    method: "DELETE"
  });

  return respuesta.json();
}

