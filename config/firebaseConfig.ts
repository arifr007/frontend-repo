import { initializeApp } from 'firebase/app'
import { getAuth } from 'firebase/auth'

/**
 * Firebase configuration object.
 * Values are loaded from environment variables at runtime.
 */


const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FBASE_APP_ID,
}

/**
 * Initializes the Firebase application and returns the authentication instance.
 */
const initializeFirebaseAuth = () => {
  const firebaseApp = initializeApp(firebaseConfig)
  return getAuth(firebaseApp)
}

const auth = initializeFirebaseAuth()

export { auth }