import { useEffect, useState } from "react";
import { obtenerReseñas, eliminarReseña } from "../services/reseñasService";
import { Link } from "react-router-dom";

export default function ListaReseñas() {
  const [reseñas, setReseñas] = useState([]);

  const cargarReseñas = () => {
    obtenerReseñas().then(res => setReseñas(res.data));
  };

  useEffect(() => {
    cargarReseñas();
  }, []);

  const borrar = async (id) => {
    await eliminarReseña(id);
    cargarReseñas();
  };

  return (
    <div>
      <h2>Reseñas</h2>
      <Link to="/nueva-reseña">Agregar reseña</Link>

      {reseñas.length === 0 && <p>No hay reseñas.</p>}

      <ul>
        {reseñas.map(r => (
          <li key={r._id}>
            <strong>Juego:</strong> {r.juegoId?.titulo || "Sin título"}
            {" | "}
            <strong>Puntuación:</strong> {r.puntuacion}⭐
            {" | "}
            <strong>Horas:</strong> {r.horasJugadas}
            {" | "}
            <Link to={`/editar-reseña/${r._id}`}>Editar</Link>
            {" | "}
            <button onClick={() => borrar(r._id)}>Eliminar</button>
          </li>
        ))}
      </ul>
    </div>
  );
}