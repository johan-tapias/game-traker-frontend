import { useEffect, useState } from "react";
import { obtenerJuegos } from "../services/juegosService";
import { obtenerReseñas } from "../services/reseñasService";
import "./../styles/componentes.css";

export default function EstadisticasPersonales() {
  const [juegos, setJuegos] = useState([]);
  const [reseñas, setReseñas] = useState([]);

  useEffect(() => {
    obtenerJuegos().then(res => setJuegos(res.data));
    obtenerReseñas().then(res => setReseñas(res.data));
  }, []);

  if (juegos.length === 0) return <p>No hay suficientes datos.</p>;

  // Cálculos
  const totalCompletados = juegos.filter(j => j.completado).length;
  const totalHoras = reseñas.reduce((acc, r) => acc + (r.horasJugadas || 0), 0);

  const juegosPorGenero = juegos.reduce((acc, j) => {
    acc[j.genero] = (acc[j.genero] || 0) + 1;
    return acc;
  }, {});

  const juegosPorPlataforma = juegos.reduce((acc, j) => {
    acc[j.plataforma] = (acc[j.plataforma] || 0) + 1;
    return acc;
  }, {});

  // Porcentajes para gráfica pastel
  const totalPlataformas = Object.values(juegosPorPlataforma).reduce((a, b) => a + b, 0);

  const pastel = Object.keys(juegosPorPlataforma).map(key => ({
    label: key,
    porcentaje: (juegosPorPlataforma[key] / totalPlataformas) * 100
  }));

  return (
    <div className="dashboard">

      <h1 className="titulo-pagina">Estadísticas</h1>

      {/* TARJETAS SUPERIORES */}
      <div className="dashboard-cards">
        <div className="dash-card">
          <h3>Juegos Completados</h3>
          <span className="dash-num">{totalCompletados}</span>
        </div>

        <div className="dash-card">
          <h3>Horas Jugadas</h3>
          <span className="dash-num">{totalHoras}</span>
        </div>
      </div>

      {/* GRÁFICA DE BARRAS */}
      <div className="grafica-card">
        <h2>Juegos por Género</h2>

        <div className="barras-container">
          {Object.keys(juegosPorGenero).map(gen => (
            <div key={gen} className="barra-item">
              <div
                className="barra"
                style={{ height: `${juegosPorGenero[gen] * 15}px` }}
              ></div>
              <span>{gen}</span>
            </div>
          ))}
        </div>
      </div>

      {/* GRÁFICA DE PASTEL (CSS PURO) */}
      <div className="grafica-card">
        <h2>Plataformas</h2>

        <div className="pastel">
          {pastel.map((p, i) => (
            <div
              key={i}
              className="pastel-segmento"
              style={{
                "--inicio": `${i === 0 ? 0 : pastel[i - 1].porcentaje}%`,
                "--valor": `${p.porcentaje}%`,
                background:
                  i % 2 === 0 ? "var(--primario)" : "var(--secundario)"
              }}
            ></div>
          ))}
        </div>

        <ul className="pastel-leyenda">
          {pastel.map((p, i) => (
            <li key={i}>
              <span
                className="leyenda-color"
                style={{
                  background:
                    i % 2 === 0 ? "var(--primario)" : "var(--secundario)"
                }}
              ></span>
              {p.label}
            </li>
          ))}
        </ul>

      </div>

    </div>
  );
}