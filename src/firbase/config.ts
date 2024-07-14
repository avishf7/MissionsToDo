import { initializeApp } from 'firebase/app'
import { getFirestore } from 'firebase/firestore'

// Firebase configuration object containing API keys and project details
const firebaseConfig = {
  apiKey: "AIzaSyAPFglzy27ZSj6OUH8Sl9t6SjYw_4g8ydU",
  authDomain: "missiontodo-6fe69.firebaseapp.com",
  projectId: "missiontodo-6fe69",
  storageBucket: "missiontodo-6fe69.appspot.com",
  messagingSenderId: "547805085074",
  appId: "1:547805085074:web:3b045fc94da67bdb6a154b"
}

// Initialize Firebase app with provided configuration
const firebaseApp = initializeApp(firebaseConfig)

// Get Firestore database instance from initialized Firebase app
export const db = getFirestore(firebaseApp)