import TopPage from './TopPage.jsx'
import BottomPage from './BottomPage.jsx'

import './CSS/Accueil.css'
import img from './assets/albert-einstein-citation-anti-gravite.png'
import logo from './assets/bigLogo.png'

function Accueil(){
    const accueilPage = (
        <div>
            <TopPage />
            <div className='accueil-page'>
                <div className='image-container'>
                    <img src={logo} alt='' className='LogoTitle'/>
                </div>
                <div className='image-container'>
                    <img src={img} alt='' className='CitationImage'/>
                </div>
                <div className='text-container-type-a'>
                    <p className='text'>Depuis la nuit des temps les êtres humains communiquent. Au début, ce n'était que des gestes, puis des bruits et seulement depuis quelques millénaires, les langues. Les langages ont permis, à travers l'histoire, de galvaniser les foules. Grâce à la langue les humains ont évolué pour devenir meilleurs à travers de grands discours. Et dans ces discours, des phrases, plus marquantes que d'autres, qui nous sont parvenues jusqu'à aujourd'hui. Afin de ne pas oublier les précédentes et les suivantes nous avons créé ce site ayant pour but de contenir toutes les phrases les plus mémorables de l'humanité.</p>
                </div>
            </div>
            <BottomPage />
        </div>
    );


    return accueilPage;
}

export default Accueil;