import React, { useState } from "react";
import {
  Modal,
  View,
  Text,
  TextInput,
  Button,
  TouchableWithoutFeedback,
  Keyboard,
  Alert,
} from "react-native";
import {
  getFirestore,
  collection,
  query,
  where,
  getDocs,
  addDoc,
} from "firebase/firestore";
import { getAuth } from "firebase/auth";

import styles from "./style";

const db = getFirestore();
const auth = getAuth();

const AddContactModal = ({ visible, onClose }) => {
  const [email, setEmail] = useState("");

  const sendFriendRequest = async () => {
    const currentUser = auth.currentUser;
    if (!currentUser) {
      Alert.alert("Erro", "Você precisa estar logado para enviar pedidos.");
      return;
    }

    if (!email) {
      Alert.alert("Erro", "Por favor, insira um e-mail válido!");
      return;
    }

    try {
      // Busca o ID do usuário pelo e-mail
      const usersRef = collection(db, "users");
      const q = query(usersRef, where("email", "==", email));
      console.log("Buscando usuário com o e-mail:", email);
      const querySnapshot = await getDocs(q);
      console.log("Resultado da consulta:", querySnapshot);

      if (querySnapshot.empty) {
        Alert.alert("Erro", "Nenhum usuário encontrado com este e-mail.");
        return;
      }

      // Obtém o ID do destinatário
      const recipientDoc = querySnapshot.docs[0];
      const recipientId = recipientDoc.id;

      // Envia o pedido de amizade
      await addDoc(collection(db, "friendRequests"), {
        from: currentUser.uid,
        to: recipientId,
        status: "pending",
        createdAt: new Date(),
      });

      Alert.alert("Sucesso", "Pedido de amizade enviado!");
      setEmail(""); // Limpa o campo
      onClose(); // Fecha o modal
    } catch (error) {
      console.error("Erro ao enviar pedido de amizade:", error);
      Alert.alert("Erro", "Não foi possível enviar o pedido.");
    }
  };

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={visible}
      onRequestClose={onClose}
    >
      <TouchableWithoutFeedback
        onPress={() => {
          onClose();
          Keyboard.dismiss();
        }}
      >
        <View style={styles.modalOverlay}>
          <TouchableWithoutFeedback>
            <View style={styles.modalContent}>
              <Text style={styles.modalTitle}>Adicionar Contato</Text>
              <TextInput
                style={styles.input}
                placeholder="Digite o e-mail"
                value={email}
                onChangeText={setEmail}
              />
              <Button title="Enviar Pedido" onPress={sendFriendRequest} />
            </View>
          </TouchableWithoutFeedback>
        </View>
      </TouchableWithoutFeedback>
    </Modal>
  );
};

export default AddContactModal;
