import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Accueil from './Accueil.jsx';
import CitationsList from './CitationsList.jsx';
import Citation from './Citation.jsx';
import Connexion from './Connexion.jsx';
import AddCitation from './AddCitation.jsx';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Accueil />} />
        <Route path="/citationsList" element={<CitationsList />} />
        <Route path="/citation/:citationId" element={<Citation />} />
        <Route path="/addCitation" element={<AddCitation />} />
        <Route path="/connexion" element={<Connexion />} />
      </Routes>
    </Router>
  );
}

export default App;