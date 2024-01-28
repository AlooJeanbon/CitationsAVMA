import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './CSS/TopPage.css';
import img from './assets/logo.png'

function TopPage() {
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    useEffect(() => {
        checkLoginStatus();
    }, []);

    const checkLoginStatus = async () => {
        try {
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

    const handleDiscordLogout = async () => {
        try {
            const response = await axios.get(`http://localhost:3000/utilisateur/logout`);
            window.location.href = '/';
        } catch (error) {
            console.error('Erreur lors de la récupération de l\'URL d\'authentification Discord:', error);
            if (error.response) {
                console.error('Réponse serveur:', error.response.data);
            }
        }
    };

    return (
        <div className='top-page'>
            <img src={img} alt='logo' className='logo'/>
            
            <nav className='top-page'>
                <li><a href='/' className='button'>Accueil</a></li>
                <li><a href='/citationsList' className='button'>Citations</a></li>
                {isLoggedIn && <li><a href='/addCitation' className='button'>Ajouter</a></li>}
                {isLoggedIn && <li><a href='/favorites' className='button'>Favoris</a></li>}
                {isLoggedIn && <li><a className='button' onClick={handleDiscordLogout}>Deconnexion</a></li>}
                {!isLoggedIn && <li><a className='button' href='https://discord.com/api/oauth2/authorize?client_id=1181168268900315136&response_type=code&redirect_uri=http%3A%2F%2Flocalhost%3A5173%2F&scope=identify'>Connexion</a></li>}
            </nav>
        </div>
    );
}

export default TopPage;
