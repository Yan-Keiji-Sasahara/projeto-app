import { useEffect, useState } from "react";
import { collection, query, where, onSnapshot, addDoc, serverTimestamp } from "firebase/firestore";
import { db } from "../config/firebaseConfig";

// Hook para monitorar pedidos de amizade recebidos
const useFriendRequests = (userId) => {
  const [friendRequests, setFriendRequests] = useState([]); // Inicializando como array
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!userId) {
      setLoading(false);
      setError("ID de usuário não fornecido.");
      return;
    }

    const q = query(
      collection(db, "friendRequests"),
      where("to", "==", userId),
      where("status", "==", "pending")
    );

    const unsubscribe = onSnapshot(
      q,
      (snapshot) => {
        // Log de debug para ver a estrutura do snapshot
        console.log("Snapshot received:", snapshot);

        const requests = snapshot.docs.map(doc => {
          return { id: doc.id, ...doc.data() };
        });

        // Garantir que friendRequests seja sempre um array
        if (Array.isArray(requests)) {
          setFriendRequests(requests);
        } else {
          console.log("Não é um array, setando como vazio.");
          setFriendRequests([]); // Se não for um array, setar um array vazio
        }

        setLoading(false);
      },
      (err) => {
        console.log("Erro ao buscar dados:", err.message); // Log do erro
        setError(err.message);
        setLoading(false);
      }
    );

    return () => unsubscribe();
  }, [userId]);

  return { friendRequests, loading, error };
};

export default useFriendRequests;
