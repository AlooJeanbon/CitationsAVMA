import React, { useEffect, useState } from 'react';
import axios from "axios";
import './CSS/CitationsList.css';
import TopPage from './TopPage.jsx';
import BottomPage from './BottomPage.jsx';

function Favorites() {
    const [citations, setCitations] = useState([]);

    useEffect(() => {
        fetchCitations();
    }, []);

    const fetchCitations = async () => {
        try {
            const idDiscord = '598881507116974100';
            const response = await axios.get(`http://localhost:3000/citations/favorites/${idDiscord}`);
            setCitations(response.data);
        } catch (error) {
            console.error('Erreur lors de la récupération des citations:', error);
        }
    };

    return (
        <div className='global'>
            <TopPage />
            <div className='citationList-page'>
                <h1 className='title'>Tous les favoris</h1>
                <ul>
                    {(Array.isArray(citations) ? citations : []).map((citation) => (
                        <li key={citation.id}>
                            <a href={`/citation/${citation.id}`} className='button'>{citation.contenu}</a>
                        </li>
                    ))}
                </ul>
            </div>
            <BottomPage />
        </div>
    );
}

export default Favorites;
