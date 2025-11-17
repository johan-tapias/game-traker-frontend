import { useEffect, useState } from "react";
import {
  crearJuego,
  obtenerJuego,
  actualizarJuego,
} from "../services/juegosService";
import { useNavigate, useParams } from "react-router-dom";
import "./../styles/componentes.css";

export default function FormularioJuego() {
  const [form, setForm] = useState({
    titulo: "",
    genero: "",
    plataforma: "",
    añoLanzamiento: "",
    desarrollador: "",
    imagenPortada: "",
    descripcion: "",
    completado: false
  });

  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    if (id) {
      obtenerJuego(id).then((res) => setForm(res.data));
    }
  }, [id]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm({ ...form, [name]: type === "checkbox" ? checked : value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (id) {
      await actualizarJuego(id, form);
    } else {
      await crearJuego(form);
    }
    navigate("/biblioteca");
  };

  return (
    <div className="form-container">

      <h1 className="form-title">
        {id ? "Editar Juego" : "Agregar Juego"}
      </h1>

      <form className="form-card" onSubmit={handleSubmit}>
        
        <label>Título</label>
        <input
          name="titulo"
          value={form.titulo}
          onChange={handleChange}
          required
        />

        <label>Género</label>
        <input
          name="genero"
          value={form.genero}
          onChange={handleChange}
          required
        />

        <label>Plataforma</label>
        <input
          name="plataforma"
          value={form.plataforma}
          onChange={handleChange}
          required
        />

        <label>Año de lanzamiento</label>
        <input
          name="añoLanzamiento"
          type="number"
          value={form.añoLanzamiento}
          onChange={handleChange}
        />

        <label>Desarrollador</label>
        <input
          name="desarrollador"
          value={form.desarrollador}
          onChange={handleChange}
        />

        <label>URL de portada</label>
        <input
          name="imagenPortada"
          value={form.imagenPortada}
          onChange={handleChange}
        />

        <label>Descripción</label>
        <textarea
          name="descripcion"
          value={form.descripcion}
          onChange={handleChange}
          rows="4"
        />

        <label className="check-label">
          <input
            type="checkbox"
            name="completado"
            checked={form.completado}
            onChange={handleChange}
          />
          Marcar como completado
        </label>

        <button className="btn-submit" type="submit">
          Guardar
        </button>
      </form>
    </div>
  );
}