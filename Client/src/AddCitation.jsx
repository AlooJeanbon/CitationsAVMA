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
          texte: citationText,
          idDiscord: 598881507116974100
        });
  
        console.log('Nouvelle citation ajoutée:', response.data);
        setCitationText('');
      } catch (error) {
        console.error('Erreur lors de l\'ajout de la citation:', error.response.data.message);
      }
    };

  return (
    <div>
      <TopPage />
      <div className='accueil-page'>
        <h1 className='title'>Nouvelle citation</h1>
        <div className='text-container-type-a'>
          Texte de la citation:
          <textarea value={citationText} onChange={handleInputChange} />
          <button onClick={handleAddCitation}>Ajouter la citation</button>
        </div>
      </div>
      <BottomPage />
    </div>
  );
}

export default AddCitation;

