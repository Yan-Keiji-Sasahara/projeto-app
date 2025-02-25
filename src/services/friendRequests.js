import { collection, addDoc, query, where, getDocs } from "firebase/firestore";
import { db } from "../firebaseConfig"; // Importa o Firestore

// Função para enviar um pedido de amizade
const sendFriendRequest = async (fromUserId, toUserId) => {
  try {
    // Verifica se já existe um pedido pendente entre esses usuários
    const q = query(
      collection(db, "friendRequests"),
      where("from", "==", fromUserId),
      where("to", "==", toUserId),
      where("status", "==", "pending")
    );

    const existingRequest = await getDocs(q);
    if (!existingRequest.empty) {
      console.log("Pedido de amizade já enviado!");
      return;
    }

    // Cria um novo pedido de amizade no Firestore
    await addDoc(collection(db, "friendRequests"), {
      from: fromUserId,
      to: toUserId,
      status: "pending",
      timestamp: new Date().toISOString()
    });

    console.log("Pedido de amizade enviado!");
  } catch (error) {
    console.error("Erro ao enviar pedido de amizade:", error);
  }
};

export { sendFriendRequest };
