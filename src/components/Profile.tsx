import { useContext } from 'react';
import { ChallengesContext } from '../contexts/ChallengesContext';
import styles from '../styles/components/Profile.module.css'
import { signIn, signOut, useSession } from 'next-auth/client'


 


export function Profile() {
    const { level, showBoxIcons } = useContext(ChallengesContext);
    const [ session, loading ] = useSession()
        
    return(
        <div className={styles.profileContainer}>
            <img src="/icons/ideia.png" id="myImageElement"/>
            <div>
                
            </div>
            
            <div>
            <div id="iconBoxContainer">
                    <button 
                        id="clickedButton"
                        className="showButton"
                        type="button"
                        onClick= {showBoxIcons}
                    > 
                        Icone 
                    </button>
                
                <div id="iconsBoxContainerId" className={styles.iconsBoxContainer}> 
                    <img className="img-1" id="iconA" src="/icons/elefante.png"/> 
                    <img className="img-2" id="iconB" src="/icons/ideia.png"/>  
                    <img className="img-3" id="iconC" src="/icons/flor.png"/> 
                    
                </div>
           </div>
                
                <p>
                    <p>Você</p>
                    <img src="icons/level.svg" alt="Level"/>
                    Level {level} 
                </p>
            </div>
        </div>
    );
}