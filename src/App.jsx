import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";

import Home from "./pages/Home";
import BibliotecaJuegos from "./components/BibliotecaJuegos";
import JuegoDetalle from "./pages/JuegoDetalle";
import FormularioJuego from "./components/FormularioJuego";
import ListaReseñas from "./components/ListaReseñas";
import FormularioReseña from "./components/FormularioReseña";
import EstadisticasPersonales from "./components/EstadisticasPersonales";

function App() {
  return (
    <Router>
      <Header />

      <main className="contenido">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/biblioteca" element={<BibliotecaJuegos />} />
          <Route path="/juego/:id" element={<JuegoDetalle />} />
          <Route path="/nuevo-juego" element={<FormularioJuego />} />
          <Route path="/editar/:id" element={<FormularioJuego />} />
          <Route path="/reseñas" element={<ListaReseñas />} />
          <Route path="/nueva-reseña" element={<FormularioReseña />} />
          <Route path="/editar-reseña/:id" element={<FormularioReseña />} />
          <Route path="/estadisticas" element={<EstadisticasPersonales />} />
        </Routes>
      </main>

      <Footer />
    </Router>
  );
}

export default App;