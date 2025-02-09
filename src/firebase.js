import { initializeApp} from "firebase/app";
import { getFirestore }  from "firebase/firestore"

const firebaseConfig = {
  apiKey: "AIzaSyBudUs1QzJWGWe_9_utI8xrZoNHztiHxcI",
  authDomain: "personal-diary-3c1a0.firebaseapp.com",
  projectId: "personal-diary-3c1a0",
  storageBucket: "personal-diary-3c1a0.appspot.com",
  messagingSenderId: "170753897298",
  appId: "1:170753897298:web:06909bfefbf1396e2bc08b",
  measurementId: "G-NGGVVN8XDY"
};

const app = initializeApp(firebaseConfig);
export const db= getFirestore(app);