import { Route, Routes } from 'react-router-dom';
import { BotonInicio } from './components/BotonInicio';
import { Inicio } from './pages/Inicio';
import { Tema } from './pages/Tema';
import { Contenidos } from './pages/Contenidos';
import { QuizPage } from './pages/QuizPage';
import { Resultado } from './pages/Resultado';

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
      </Routes>
    </>
  );
}

export default App;
