import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";
import { getDatabase, ref, push, set, onValue, update } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-database.js";

const firebaseConfig = {
  apiKey: "AIzaSyCqDZ6PAVjA66CqFSn08Cf1Io71qSg4J1U",
  authDomain: "cancionero-maranatha.firebaseapp.com",
  projectId: "cancionero-maranatha",
  storageBucket: "cancionero-maranatha.firebasestorage.app",
  messagingSenderId: "1074057464704",
  appId: "1:1074057464704:web:9ca28a80a8df68805bcf65",
  databaseURL: "https://cancionero-maranatha-default-rtdb.firebaseio.com"
};

const app = initializeApp(firebaseConfig);
export const db = getDatabase(app);
export { ref, push, set, onValue, update };
