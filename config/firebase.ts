// Import the functions you need from the SDKs you need
import {initializeApp} from 'firebase/app';
// @ts-ignore
import {initializeAuth, getReactNativePersistence} from 'firebase/auth';
import AsyncStorage from '@react-native-async-storage/async-storage';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: 'AIzaSyDsMIjFd4S4k63uosUvaEMAiw5RR5kmWbU',
  authDomain: 'react-native-login-88182.firebaseapp.com',
  projectId: 'react-native-login-88182',
  storageBucket: 'react-native-login-88182.appspot.com',
  messagingSenderId: '115883804429',
  appId: '1:115883804429:web:8c1fa8ac76a13483291244',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(AsyncStorage),
});

export {auth};
