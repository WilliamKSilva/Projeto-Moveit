import styles from '../styles/components/DarkThemeButton.module.css';
import { useContext } from 'react';
import { ChallengesContext } from '../contexts/ChallengesContext';

export function DarkThemeButton() {
    const { changeTheme } = useContext(ChallengesContext);
    return (
            <div className={styles.darkThemeContainer}>
                <button     
                    type="button" 
                    onClick= {changeTheme}     
                > 
                Modo Noturno
                </button>
            </div>
    )
}