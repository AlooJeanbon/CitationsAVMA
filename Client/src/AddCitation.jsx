import React, { useState } from 'react';
import TopPage from './TopPage.jsx';
import BottomPage from './BottomPage.jsx';
import axios from 'axios';

function AddCitation() {
    const [citationText, setCitationText] = useState('');

    const handleInputChange = (e) => {
      setCitationText(e.target.value);
    };
  
    const handleAddCitation = async () => {
      try {
        const response = await axios.post('http://localhost:3000/citations/add', {
          text: citationText,
        });
  
        console.log('Nouvelle citation ajoutée:', response.data);
        // Effectuer d'autres actions si nécessaire, par exemple, rediriger l'utilisateur
  
      } catch (error) {
        console.error('Erreur lors de l\'ajout de la citation:', error.response.data.message);
        // Gérer les erreurs, afficher un message à l'utilisateur, etc.
      }
    };

  return (
    <div>
      <TopPage />
      <div className='accueil-page'>
      <h1>Ajouter une nouvelle citation</h1>
      <label>
        Texte de la citation:
        <textarea value={citationText} onChange={handleInputChange} />
      </label>
      <button onClick={handleAddCitation}>Ajouter la citation</button>
      </div>
      <BottomPage />
    </div>
  );
}

export default AddCitation;
