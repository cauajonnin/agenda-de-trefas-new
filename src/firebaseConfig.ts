import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
// import { getAnalytics } from 'firebase/analytics'; // Analytics não funciona em React Native

// Firebase configuration via environment variables
// Copie o arquivo .env.example para .env e preencha com suas chaves
const firebaseConfig = {
  apiKey: 'AIzaSyB_wYfE0Jyj73Oq4KE0NJ___9VmLH7qOAc',
  authDomain: 'backend-e6c33.firebaseapp.com',
  projectId: 'backend-e6c33',
  storageBucket: 'backend-e6c33.firebasestorage.app',
  messagingSenderId: '114687682397',
  appId: '1:114687682397:web:94f86c9eb19e83030a2ab4',
  measurementId: 'G-G9BWZQGNQ0',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Authentication
const auth = getAuth(app);

// Analytics não é suportado em React Native
// const analytics = getAnalytics(app);

export { auth };
export default app;
