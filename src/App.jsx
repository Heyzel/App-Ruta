import { Route, Routes } from 'react-router-dom';
import { BotonInicio } from './components/BotonInicio';
import { ChatbotPanel } from './components/ChatbotPanel';
import { FondoAnimado } from './components/FondoAnimado';
import { ControlAudio } from './components/ControlAudio';
import { ContadorInsignias } from './components/ContadorInsignias';
import { CapaRecompensas } from './components/CapaRecompensas';
import './App.css';
import { Bienvenida } from './pages/Bienvenida';
import { Inicio } from './pages/Inicio';
import { ExamenSuficiencia } from './pages/ExamenSuficiencia';
import { Practica } from './pages/Practica';
import { Tema } from './pages/Tema';
import { Contenidos } from './pages/Contenidos';
import { JuegoDesafio } from './pages/JuegoDesafio';
import { QuizPage } from './pages/QuizPage';
import { Resultado } from './pages/Resultado';
import { Admin } from './pages/Admin';
import { AdminEditor } from './pages/AdminEditor';
import { AdminEditorContenido } from './pages/AdminEditorContenido';

function App() {
  return (
    <>
      <FondoAnimado />
      <div className="barra-superior-movil">
        <BotonInicio />
        <ContadorInsignias />
      </div>
      <ChatbotPanel />
      <ControlAudio />
      <Routes>
        <Route path="/" element={<Bienvenida />} />
        <Route path="/temas" element={<Inicio />} />
        <Route path="/examen-suficiencia" element={<ExamenSuficiencia />} />
        <Route path="/practica" element={<Practica />} />
        <Route path="/tema/:temaId" element={<Tema />} />
        <Route path="/tema/:temaId/:dificultad" element={<Contenidos />} />
        <Route path="/tema/:temaId/:dificultad/juego/:indice" element={<JuegoDesafio />} />
        <Route path="/tema/:temaId/:dificultad/quiz" element={<QuizPage />} />
        <Route path="/tema/:temaId/:dificultad/resultado" element={<Resultado />} />
        <Route path="/admin" element={<Admin />} />
        <Route path="/admin/cuestionario/:temaId/:dificultad" element={<AdminEditor />} />
        <Route path="/admin/contenido/:temaId/:dificultad" element={<AdminEditorContenido />} />
      </Routes>
      <CapaRecompensas />
    </>
  );
}

export default App;
