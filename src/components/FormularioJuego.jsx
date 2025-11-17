import { useEffect, useState } from "react";
import { crearJuego, obtenerJuego, actualizarJuego } from "../services/juegosService";
import { useNavigate, useParams } from "react-router-dom";

export default function FormularioJuego() {
  const [form, setForm] = useState({
    titulo: "",
    genero: "",
    plataforma: "",
    añoLanzamiento: "",
    desarrollador: "",
    imagenPortada: "",
    descripcion: ""
  });

  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    if (id) {
      obtenerJuego(id).then(res => setForm(res.data));
    }
  }, [id]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
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
    <div>
      <h2>{id ? "Editar Juego" : "Agregar Juego"}</h2>

      <form onSubmit={handleSubmit}>
        <input name="titulo" value={form.titulo} onChange={handleChange} placeholder="Título" />
        <input name="genero" value={form.genero} onChange={handleChange} placeholder="Género" />
        <input name="plataforma" value={form.plataforma} onChange={handleChange} placeholder="Plataforma" />
        <input name="añoLanzamiento" value={form.añoLanzamiento} onChange={handleChange} placeholder="Año" />
        <input name="desarrollador" value={form.desarrollador} onChange={handleChange} placeholder="Desarrollador" />
        <input name="imagenPortada" value={form.imagenPortada} onChange={handleChange} placeholder="URL de imagen" />

        <textarea
          name="descripcion"
          value={form.descripcion}
          onChange={handleChange}
          placeholder="Descripción"
        />

        <button type="submit">Guardar</button>
      </form>
    </div>
  );
}