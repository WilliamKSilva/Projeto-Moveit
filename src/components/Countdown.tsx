import { useState, useEffect, useContext } from 'react';
import { ChallengesContext } from '../contexts/ChallengesContext';
import { CountdownContext } from '../contexts/Countdown.context'
import styles from '../styles/components/Countdown.module.css';


export function Countdown() {
    const { changeTheme } = useContext(ChallengesContext);
    const { minutes, seconds, hasFinished, isActive, startCountdown, resetCountdown, } = useContext(CountdownContext)
    
    const [minuteLeft, minuteRight] = String(minutes).padStart(2, '0').split('')
    const [secondLeft, secondRight] = String(seconds).padStart(2, '0').split('')    
    
    return (
        <div>
            <div className={styles.countdownContainer}>
                <div id="countdownDivId">
                    <span id="minuteLeftId">{minuteLeft}</span> 
                    <span id="minuteRightId">{minuteRight}</span>
                </div> 
                <span id="dotId">:</span> 
                <div>
                    <span id="secondLeftId">{secondLeft}</span> 
                    <span id="secondRightId">{secondRight}</span>
                </div>
            </div> 

            {hasFinished ? (
                <button 
                    disabled
                    type="button"
                    className={styles.countdownButton}
              >
                   Ciclo Encerrado
                </button> 
            ): (
                <>
                    { isActive ? (
                        <button 
                            type="button" 
                            className={`${styles.countdownButton} ${styles.countdownButtonActive}`}
                            onClick={resetCountdown}        
                        >   
                            Abandonar Ciclo
                        </button>
                    ) : (
                        <button 
                            type="button" 
                            className={styles.countdownButton} 
                            onClick={startCountdown} 
                        > 
                            Iniciar um ciclo
                        </button> 
                    
                    ) }
                </>
            )} 
        </div> 
    ); 
}    
 


