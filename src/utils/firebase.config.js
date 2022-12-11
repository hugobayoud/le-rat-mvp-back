import { initializeApp } from 'firebase/app';
import { getDatabase } from 'firebase/database';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { useState, useEffect, useContext, createContext } from 'react';

export const firebaseApp = initializeApp({
  apiKey: process.env.REACT_APP_API_KEY,
  authDomain: 'react-firebase-redux-2e560.firebaseapp.com',
  projectId: 'react-firebase-redux-2e560',
  storageBucket: 'react-firebase-redux-2e560.appspot.com',
  messagingSenderId: '649085247259',
  appId: '1:649085247259:web:6752056952f538d9437dbe',
  databaseURL:
    'https://react-firebase-redux-2e560-default-rtdb.europe-west1.firebasedatabase.app',
});

export const AuthContext = createContext();

export function AuthContextProvider(props) {
  const [user, setUser] = useState();
  const [error, setError] = useState();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(getAuth(), setUser, setError);
    return () => unsubscribe();
  }, []);
  return <AuthContext.Provider value={{ user, error }} {...props} />;
}

export function useAuthState() {
  const auth = useContext(AuthContext);
  return { ...auth, isAuthenticated: auth.user != null };
}

export const database = getDatabase(firebaseApp);
