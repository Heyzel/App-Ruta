import { Route, Routes } from 'react-router-dom';
import { BotonInicio } from './components/BotonInicio';
import { Inicio } from './pages/Inicio';
import { Tema } from './pages/Tema';
import { Contenidos } from './pages/Contenidos';
import { QuizPage } from './pages/QuizPage';
import { Resultado } from './pages/Resultado';
import { Admin } from './pages/Admin';
import { AdminEditor } from './pages/AdminEditor';

function App() {
  return (
    <>
      <BotonInicio />
      <Routes>
        <Route path="/" element={<Inicio />} />
        <Route path="/tema/:temaId" element={<Tema />} />
        <Route path="/tema/:temaId/:dificultad" element={<Contenidos />} />
        <Route path="/tema/:temaId/:dificultad/quiz" element={<QuizPage />} />
        <Route path="/tema/:temaId/:dificultad/resultado" element={<Resultado />} />
        <Route path="/admin" element={<Admin />} />
        <Route path="/admin/cuestionario/:temaId/:dificultad" element={<AdminEditor />} />
      </Routes>
    </>
  );
}

export default App;
