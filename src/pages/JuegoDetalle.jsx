import { useEffect, useState } from "react";
import { obtenerJuego } from "../services/juegosService";
import { useParams, Link } from "react-router-dom";

export default function JuegoDetalle() {
  const { id } = useParams();
  const [juego, setJuego] = useState(null);

  useEffect(() => {
    obtenerJuego(id).then(res => setJuego(res.data));
  }, [id]);

  if (!juego) return <p>Cargando...</p>;

  return (
    <div>
      <h1>{juego.titulo}</h1>

      <img src={juego.imagenPortada} width="200" />

      <p>Género: {juego.genero}</p>
      <p>Plataforma: {juego.plataforma}</p>
      <p>Año: {juego.añoLanzamiento}</p>
      <p>Desarrollador: {juego.desarrollador}</p>
      <p>{juego.descripcion}</p>

      <Link to={`/editar/${juego._id}`}>Editar juego</Link>
    </div>
  );
}