import { GetServerSideProps } from 'next';

import { CompletedChallenges } from "../components/CompletedChallenges";
import { Countdown } from "../components/Countdown";
import { ExperienceBar } from "../components/ExperienceBar";
import { Profile } from "../components/Profile";
import { ChallengeBox } from "../components/ChallengeBox";

import Head from "next/head";
import { signIn, signOut, useSession } from 'next-auth/client'

import styles from '../styles/pages/Home.module.css';
import { CountdownProvider } from "../contexts/Countdown.context";
import { ChallengesProvider } from '../contexts/ChallengesContext';
import { DarkThemeButton } from '../components/DarkThemeButton';
import { FontsIcons } from '../components/FontsIcons';

interface HomeProps {
  level: number;
  currenExperience: number; 
  challengesCompleted: number;

}


export default function Home(props) { 
  const [ session, loading ] = useSession()
  

  return (
  
  
  
  <ChallengesProvider 
    level={props.level} 
    currentExperience={props.currentExperience}
    challengesCompleted={props.challengesCompleted}
    >
    <div className={styles.container}>
      <Head>
        <title>Início | move.it</title>

      </Head>
      <ExperienceBar />
      <CountdownProvider>
      <section>
        <div>
          <Profile />
          <CompletedChallenges /> 
          <Countdown />
          <FontsIcons />
          <DarkThemeButton />
        </div>
        <div>
          <ChallengeBox />
        </div>
      </section>
      </CountdownProvider>
    </div>
    
    {!session && <>
    <div className="signInContainer">
      <div>
        <div id='signInTextId' className="signInText">
          Você ainda não está logado <br/>
        </div>
        <button className="signInButton" onClick={(): Promise<void> => signIn()}>Log In</button>
      </div>
    </div>
    </>}
    {session && <>
    <div className="signOutContainer">
      <div>
        <div className="userEmailClass">
          Bem Vindo {session.user.email} <br/>
        </div>
        <div>
          <button className="signOutButton" onClick={(): Promise<void> => signOut()}>Sign out</button>
        </div>
      </div>
    </div>
    </>}
  </ChallengesProvider>
  
  
  
  )
} 

export const getServerSideProps: GetServerSideProps = async (ctx) => { 

  const { level, currentExperience, challengesCompleted } = ctx.req.cookies;

  return { 
    props: {
        level: Number(level), 
        currentExperience: Number(currentExperience), 
        challengesCompleted: Number(challengesCompleted), 
    }

  }
} 



  

  
    