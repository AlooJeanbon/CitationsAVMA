import { useEffect, useState } from 'react'
import axios from "axios"

import './CSS/CitationsList.css'
import TopPage from './TopPage.jsx';
import BottomPage from './BottomPage.jsx';

function CitationsList() {
    const [citations, setCitations] = useState([]);

    useEffect(() => {
        const fetchCitations = async () => {
            try {
                const response = await axios.get('/citations');
                setCitations(response.data);
            } catch (error) {
                console.error('Erreur lors de la récupération des données:', error);
            }
        };
    
        fetchCitations();
    }, []);


  const c = (
    <div className='global'>
        <TopPage />
        <div className='citationList-page'>
            <h1 className='title'>All citations</h1>
            <ul>
                {(Array.isArray(citations) ? citations : []).map((citation) => (
                    <li><a href={`/citation/${citation._id}`} className='button'>{citation.text}</a></li>
                ))}
            </ul>
        </div>
        <BottomPage />
    </div>
  );

  return c;
}

export default CitationsList;
