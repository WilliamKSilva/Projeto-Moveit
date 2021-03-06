import '../styles/global.css'

import { ChallengesContext, ChallengesProvider } from '../contexts/ChallengesContext'
import { useState } from 'react'
import {Provider} from 'next-auth/client';





function MyApp({ Component, pageProps }) {
  return (
  
  <Provider session={pageProps.session}>
    <Component {...pageProps} />
  </Provider>
  
  
  );
  
} 

export default MyApp
