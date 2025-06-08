
// Importa Firebase SDK (v9 modular)
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.23.0/firebase-app.js";
import {
  getDatabase, ref, set, push, update, onValue
} from "https://www.gstatic.com/firebasejs/9.23.0/firebase-database.js";

const firebaseConfig = {
  apiKey: "AIzaSyCqDZ6PAVjA66CqFSn08Cf1Io71qSg4J1U",
  authDomain: "cancionero-maranatha.firebaseapp.com",
  projectId: "cancionero-maranatha",
  storageBucket: "cancionero-maranatha.appspot.com",
  messagingSenderId: "1074057464704",
  appId: "1:1074057464704:web:9ca28a80a8df68805bcf65",
  databaseURL: "https://cancionero-maranatha-default-rtdb.firebaseio.com/"
};

const app = initializeApp(firebaseConfig);
const db = getDatabase(app);

export { db, ref, set, push, update, onValue };
