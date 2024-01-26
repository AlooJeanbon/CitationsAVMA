import React, { useEffect, useState } from 'react';
import axios from 'axios';
import TopPage from './TopPage.jsx';
import BottomPage from './BottomPage.jsx';
import { useParams } from 'react-router-dom';

function Citation() {
  const [citation, setCitation] = useState({});
  const { citationId } = useParams();

  useEffect(() => {
    if (citationId) {
      fetch(`http://localhost:3000/citations/${citationId}`)
        .then(res => res.json())
        .then(
          (result) => {
            setCitation(result);
          }
        )
        .catch((error) => {
          console.error('Erreur lors de la récupération des données:', error);
        });
    }
  }, [citationId]);

  const c = (
    <div>
      <TopPage />
      <div className='accueil-page'>
        <h1 className='title'>THE citation</h1>
        <ul>
          <li>Author: {citation.author}</li>
          <li>Date: {citation.dateAdded}</li>
          <li>Citation: {citation.text}</li>
        </ul>
      </div>
      <BottomPage />
    </div>
  );

  return c;
}

export default Citation;
