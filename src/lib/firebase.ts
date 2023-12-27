import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: 'AIzaSyChTUexYHJPfp2Kw_lZoCXb7KQ6ohNpg4U',
  authDomain: 'campusguessr.firebaseapp.com',
  databaseURL: 'https://campusguessr-default-rtdb.firebaseio.com',
  projectId: 'campusguessr',
  storageBucket: 'campusguessr.appspot.com',
  messagingSenderId: '295145381339',
  appId: '1:295145381339:web:d853c50a1da52368c75bfe',
  measurementId: 'G-6G7DM7VTP9',
};

const app = initializeApp(firebaseConfig);

const auth = getAuth(app);
const db = getFirestore(app);

export { app, auth, db };
