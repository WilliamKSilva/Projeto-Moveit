import { useContext } from 'react';
import { ChallengesContext } from '../contexts/ChallengesContext';
import styles from '../styles/components/FontsIcons.module.css';

export function FontsIcons() { 
    return (
        <div className={styles.fontsIconsContainer}>
            <p id="fonteId" className="fontsIcons">
                Fontes dos Icones utilizados: https://www.flaticon.com/br/icone-gratis/ideia_4236484?related_id=4236484&origin=pack,
                https://www.flaticon.com/br/icone-gratis/flor_4264760?related_id=4264760&origin=pack,  
                https://www.flaticon.com/br/icone-gratis/elefante_3969722?related_id=3969722&origin=pack 

            </p>
        </div>
    )


}