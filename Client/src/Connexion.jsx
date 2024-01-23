import TopPage from './TopPage.jsx'
import BottomPage from './BottomPage.jsx'

import './CSS/Accueil.css'

function Connexion(){
    const connexion = (
        <div>
            <TopPage />
            <div className='accueil-page'>
                <h1 className='title'>Connexion</h1>
            </div>
            <BottomPage />
        </div>
    );


    return connexion;
}

export default Connexion;