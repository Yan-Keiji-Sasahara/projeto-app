import React from "react";
import { View, Text, Modal, TouchableWithoutFeedback, Button } from "react-native";
import styles from "./style";
import useFriendRequests from "../../../hooks/useFriendRequests";

const NotificationModal = ({ visible, onClose, userId }) => {
  const { friendRequests, loading, error } = useFriendRequests(userId);

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={visible}
      onRequestClose={onClose}
    >
      <TouchableWithoutFeedback onPress={onClose}>
        <View style={styles.modalContainer}>
          <TouchableWithoutFeedback>
            <View style={styles.modalContent}>
              <Text style={styles.modalTitle}>Notificações</Text>

              {loading && <Text>Carregando notificações...</Text>}
              {error && <Text>Erro: {error}</Text>}

              {/* Verificando se friendRequests é um array antes de usar .map */}
              {Array.isArray(friendRequests) && friendRequests.length === 0 && !loading && !error ? (
                <Text style={styles.noNotifications}>Nenhuma nova notificação</Text>
              ) : (
                Array.isArray(friendRequests) &&
                friendRequests.length > 0 && // Garantindo que existam pedidos
                friendRequests.map((request) => (
                  <View key={request.id} style={styles.notificationItem}>
                    <Text>{request.from} enviou um pedido de amizade!</Text>
                    <Button title="Aceitar" onPress={() => console.log("Aceitar pedido", request.id)} />
                    <Button title="Recusar" onPress={() => console.log("Recusar pedido", request.id)} />
                  </View>
                ))
              )}
            </View>
          </TouchableWithoutFeedback>
        </View>
      </TouchableWithoutFeedback>
    </Modal>
  );
};

export default NotificationModal;
