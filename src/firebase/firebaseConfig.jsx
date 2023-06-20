// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAhqbVKNyS-WczXA9E403Ra5pUJAjglaBo",
  authDomain: "incidencias-9293c.firebaseapp.com",
  projectId: "incidencias-9293c",
  storageBucket: "incidencias-9293c.appspot.com",
  messagingSenderId: "1084214828159",
  appId: "1:1084214828159:web:91b0a5d3af3d413616f34a",
  measurementId: "G-86Y595N2KH"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export { app, analytics };
