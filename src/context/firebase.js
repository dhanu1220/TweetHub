import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getStorage } from 'firebase/storage';

const firebaseConfig = {
  apiKey: "AIzaSyA-_eb8qwqm95GyXGiYNuvg1N7ndvLPfz0",
  authDomain: "twitter-76f69.firebaseapp.com",
  projectId: "twitter-76f69",
  storageBucket: "twitter-76f69.appspot.com",
  messagingSenderId: "545925384829",
  appId: "1:545925384829:web:e8ea767cb0cf32fe3ebf14",
  measurementId: "G-FLKQTTV5V1"
};

const app = initializeApp(firebaseConfig);
const storage = getStorage(app);
const auth = getAuth(app);

export { storage, auth };
export default app;