import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Landing from './pages/Landing';
import Presentation from './pages/Presentation';
import KnowledgeGraphDemo from './demos/KnowledgeGraphDemo';
import ValidationSimulatorDemo from './demos/ValidationSimulatorDemo';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/presentation" element={<Presentation />} />
        <Route path="/demo/knowledge-graph" element={<KnowledgeGraphDemo />} />
        <Route path="/demo/validator" element={<ValidationSimulatorDemo />} />
      </Routes>
    </Router>
  );
}

export default App;
