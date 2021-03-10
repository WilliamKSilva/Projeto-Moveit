import { createContext, useState, ReactNode, useEffect, useRef} from 'react'; 
import Cookies from 'js-cookie';
import challenges from '../../challenges.json';
import { LevelUpModal } from '../components/LevelUpModal';
import session from 'next-auth';
import { IconButton } from '@material-ui/core';


interface Challenge {
    type: 'body' | 'eye'; 
    description: string; 
    amount: number;
}

interface ChallengeContextData {
    level: number;
    currentExperience: number; 
    experienceToNextLevel: number;
    challengesCompleted: number;
    activeChallenge: Challenge;
    completeChallenge: () => void;
    levelUp: () => void;
    startNewChallenge: () => void;
    resetChallenge: () => void;
    closeLevelUpModal: () => void;
    changeTheme: () => void;
    showBoxIcons: () => void;
    
}

interface ChallengesProviderProps {
    children: ReactNode;
    level: number;
    currentExperience: number; 
    challengesCompleted: number;
    
} 



export const ChallengesContext = createContext({} as ChallengeContextData); 

export function ChallengesProvider({ 
    children,
    ...rest
 }: ChallengesProviderProps) {
    const [level, setLevel] = useState(rest.level ?? 1); 
    const [currentExperience, setCurrentExperiencie] = useState(rest.currentExperience ?? 0);
    const [challengesCompleted, setChallengesCompleted] = useState(rest.challengesCompleted ?? 0);

    const [ iconsBox, setIconsBox] = useState(true);
    
    const [activeChallenge, setActiveChallenge] = useState(null) 
    const [isLevelUpModalOpen, setIsLevelUpModalOpen] = useState(false)
    
    const experienceToNextLevel = Math.pow((level + 1) * 4, 2) 

    const [darkTheme, setDarkTheme] = useState(true)
    useEffect(() => {
        Notification.requestPermission();
    }, []) 

    useEffect(() => { 
        Cookies.set('level', String(level));
        Cookies.set('currentExperience', String(currentExperience)); 
        Cookies.set('challengesCompleted', String(challengesCompleted));
    }, [level, currentExperience, challengesCompleted]);
    
    
    function showBoxIcons() { 
            var x = document.getElementById("iconsBoxContainerId");
            if (x.style.display === "none") {
              x.style.display = "block";
            } else {
              x.style.display = "none";
            }
          }
         

    
    
    
    function changeTheme() {
       const background = document.querySelector("body") 
        background.style.backgroundColor = 'rgb(18,18,18)'
        
       const challengeContainer = document.getElementById('challengeBox');  
       challengeContainer.style.backgroundColor = 'rgb(64,64,64)' 

       const strongText = document.getElementById('strongId'); 
       strongText.style.color = 'rgb(211,211,211)' 

       const pText = document.getElementById('pId'); 
       pText.style.color = 'rgb(211,211,211)'; 

       const minuteLeft = document.getElementById('minuteLeftId')
       minuteLeft.style.color = 'rgb(211,211,211)';
       minuteLeft.style.backgroundColor = 'rgb(64,64,64)';
       
       const minuteRight = document.getElementById('minuteRightId')
       minuteRight.style.color = 'rgb(211,211,211)';
       minuteRight.style.backgroundColor = 'rgb(64,64,64)';
       
       const secondLeft = document.getElementById('secondLeftId') 
       secondLeft.style.color = 'rgb(211,211,211)';
       secondLeft.style.backgroundColor = 'rgb(64,64,64)';
       
       const secondRight = document.getElementById('secondRightId')
       secondRight.style.color = 'rgb(211,211,211)';
       secondRight.style.backgroundColor = 'rgb(64,64,64)'; 
       
       const dot = document.getElementById('dotId')    
       dot.style.color = 'rgb(211,211,211)'; 

       
        
       
    }
    
    function levelUp() {
        setLevel(level + 1);
        setIsLevelUpModalOpen(true)
    }
    
    function closeLevelUpModal() {
        setIsLevelUpModalOpen(false)
    }
    
    function startNewChallenge() {
        const randomChallengeIndex = Math.floor(Math.random() * challenges.length)
        const challenge = challenges[randomChallengeIndex]; 

        setActiveChallenge(challenge)

        new Audio('/notification.mp3').play();
        
        if (Notification.permission === 'granted') {
            new Notification('Novo Desafio!', {
                body: `Valendo ${challenge.amount}xp!`
            })
        }
    }   

    function resetChallenge() { 
        setActiveChallenge(null);
        
    }

    function completeChallenge() {
        if(!activeChallenge) {
            return;
        } 

        const { amount } = activeChallenge; 

        let finalExperience = currentExperience + amount;
    
        if (finalExperience >= experienceToNextLevel) {
            finalExperience = finalExperience - experienceToNextLevel; 
            levelUp();
        } 

        setCurrentExperiencie(finalExperience); 
        setActiveChallenge(null); 
        setChallengesCompleted(challengesCompleted + 1);
    }
    
    return (
        <ChallengesContext.Provider 
            value={{ 
                level, 
                currentExperience, 
                experienceToNextLevel,
                challengesCompleted, 
                levelUp,
                startNewChallenge, 
                activeChallenge, 
                resetChallenge,
                completeChallenge, 
                closeLevelUpModal,
                changeTheme,
                showBoxIcons,
            }}
        >
            {children}
        
        { isLevelUpModalOpen && <LevelUpModal /> }
        </ChallengesContext.Provider> 
    );

} 