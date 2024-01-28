import React, { useEffect, useState } from 'react';
import axios from "axios";
import './CSS/CitationsList.css';
import TopPage from './TopPage.jsx';
import BottomPage from './BottomPage.jsx';

function CitationsList() {
    const [citations, setCitations] = useState([]);

    useEffect(() => {
        fetchCitations();
    }, []);

    const fetchCitations = async () => {
        try {
            const response = await axios.get('http://localhost:3000/citations/');
            setCitations(response.data);
        } catch (error) {
            console.error('Erreur lors de la récupération des citations:', error);
        }
    };

    const [isLoggedIn, setIsLoggedIn] = useState(false);

    useEffect(() => {
        checkLoginStatus();
    }, []);

    const checkLoginStatus = async () => {
        try {
            // Vérifier si l'utilisateur est connecté en interrogeant le backend
            const response = await axios.get('http://localhost:3000/utilisateur/profile');
            const profileData = response.data;
            console.error('Erreur lors de la récupération de l\'URL d\'authentification Discord:', profileData);
            if (profileData == undefined) {
                setIsLoggedIn(false);
            } else {
                setIsLoggedIn(true); // L'utilisateur est connecté
            }
        } catch (error) {
            setIsLoggedIn(false); // L'utilisateur n'est pas connecté
        }
    };

    const handleAddToFavorites = async (idCitation) => {
        try {
            const idDiscord = '598881507116974100'; // Remplacez par l'ID Discord de l'utilisateur connecté
            
            // Vérifiez d'abord si la citation est déjà ajoutée aux favoris de l'utilisateur
            const favoritesResponse = await axios.get(`http://localhost:3000/citations/favorites/${idDiscord}`);
            const userFavorites = favoritesResponse.data;
    
            // Vérifiez si la citation est déjà dans les favoris de l'utilisateur
            const isAlreadyAdded = userFavorites.some(favorite => favorite.id === idCitation);
    
            if (isAlreadyAdded) {
                console.log('La citation est déjà ajoutée aux favoris.');
                // Afficher un message à l'utilisateur ou ignorer l'action d'ajout
            } else {
                // Ajoutez la citation aux favoris
                const response = await axios.post('http://localhost:3000/citations/favorite', {
                    idCitation: idCitation,
                    idDiscord: idDiscord
                });
                console.log('Citation ajoutée aux favoris:', response.data);
                // Rafraîchir la liste des citations après l'ajout aux favoris
                fetchCitations();
            }
        } catch (error) {
            console.error('Erreur lors de l\'ajout de la citation aux favoris:', error);
        }
    };

    return (
        <div className='global'>
            <TopPage />
            <div className='citationList-page'>
                <h1 className='title'>Toutes les citations</h1>
                <ul>
                    {(Array.isArray(citations) ? citations : []).map((citation) => (
                        <li key={citation.id}>
                            <a href={`/citation/${citation.id}`} className='button'>{citation.contenu}</a>
                            {isLoggedIn && <button onClick={() => handleAddToFavorites(citation.id)} className='button'>Ajouter aux favoris</button>}
                        </li>
                    ))}
                </ul>
            </div>
            <BottomPage />
        </div>
    );
}

export default CitationsList;
