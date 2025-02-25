import { initializeApp } from "firebase/app";
import { getAuth, signOut } from "firebase/auth";
import { getFirestore } from "firebase/firestore";  // Importando o Firestore

const firebaseConfig = {
  apiKey: "AIzaSyCl2zfu5Hhg6PtDeh87yKCP1fnVNasInJ8",
  authDomain: "wholesale-9eecd.firebaseapp.com",
  projectId: "wholesale-9eecd",
  storageBucket: "wholesale-9eecd.appspot.com", //anteriormente: "wholesale-9eecd.firebasestorage.app",
  messagingSenderId: "896106574166",
  appId: "1:896106574166:web:398292f06471c4c7cea6f7",
  measurementId: "G-7CFPLGPFRM"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);  // Inicializando o Firestore

// Função de logout
const logout = async () => {
  try {
    await signOut(auth);
  } catch (error) {
    console.error("Erro ao sair:", error);
  }
};

export { auth, db, logout };  // Exportando a função de logout também
