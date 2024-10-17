import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getDatabase, ref, onValue } from "firebase/database";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBE4XyVujl_JKe_mxTJt4zZsi9bVh0JawQ",
  authDomain: "pedometer-iot-project.firebaseapp.com",
  databaseURL:
    "https://pedometer-iot-project-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "pedometer-iot-project",
  storageBucket: "pedometer-iot-project.appspot.com",
  messagingSenderId: "152914682759",
  appId: "1:152914682759:web:48c79ec40e97b6aa106922",
  measurementId: "G-5MY5HG4YMJ",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const db = getDatabase(app);
