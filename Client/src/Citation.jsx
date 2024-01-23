import { useEffect, useState } from 'react'
import axios from "axios"

import TopPage from './TopPage.jsx';
import BottomPage from './BottomPage.jsx';

function Citation({citationId}) {
    const [citation, setCitations] = useState([]);

    useEffect(() => {
        const fetchCitations = async () => {
            try {
                const response = await axios.get('/'+ citationId);
                setCitations(response.data);
            } catch (error) {
                console.error('Erreur lors de la récupération des données:', error);
            }
        };
    
        fetchCitations();
    }, []);


  const c = (
    <div>
        <TopPage />
        <div className='accueil-page'>
            <h1 className='title'>THE citation</h1>
            <ul>
                <li>Author : {citation.author}</li>
                <li>Date : {citation.dateAdded}</li>
                <li>Citation : {citation.text}</li>
            </ul>
        </div>
        <BottomPage />
    </div>
  );

  return c;
}

export default Citation;
