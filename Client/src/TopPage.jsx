import React from 'react';
import axios from 'axios';
import './CSS/TopPage.css'

function TopPage(){
    const handleDiscordLogin = async () => {
        try {
          const response = await axios.get(`${process.env.DATABASE_URI}/auth/discord`);
          window.location.href = response.data.authUrl;
        } catch (error) {
          console.error('Erreur lors de la récupération de l\'URL d\'authentification Discord:', error);
        }
    };

    const topPage = (
        <div className='top-page'>
            <img src='' alt='logo' className='logo'/>
            
            <nav className='top-page'>
                <li><a href='/' className='button'>Accueil</a></li>
                <li><a href='/citationsList' className='button'>Citations</a></li>
                <li><a onClick={handleDiscordLogin} className='button'>Connexion</a></li>
            </nav>
        </div>
    );


    return topPage;
}

export default TopPage;