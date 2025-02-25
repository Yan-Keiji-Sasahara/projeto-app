import React, { useState } from 'react';
import { View, TouchableOpacity, Text, Modal } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import styles from './style';
import { logout } from '../../../config/firebaseConfig'; 
import { CommonActions } from '@react-navigation/native'; // recem adicionado, ainda dando alerta de erro

const SettingsButton = ({ navigation, notifications, onNotificationPress }) => {
  const [menuVisible, setMenuVisible] = useState(false);

  const handleLogout = async () => {
    await logout();
    navigation.dispatch(
      CommonActions.replace ({
        index: 0,
        routes: [{ name: 'Login' }],
      })
    );
  };

  return (
    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
      {/* Botão de configurações com menu suspenso */}
      <TouchableOpacity onPress={() => setMenuVisible(true)} style={styles.settingsButton}>
        <Ionicons name="settings-outline" size={24} color="black" />
      </TouchableOpacity>

      {/* Modal do menu suspenso */}
      <Modal
        transparent={true}
        visible={menuVisible}
        animationType="fade"
        onRequestClose={() => setMenuVisible(false)}
      >
        <TouchableOpacity style={styles.overlay} onPress={() => setMenuVisible(false)}>
          <View style={[styles.menuContainer, { position: 'absolute', top: 40, right: 10 }]}> 
            <TouchableOpacity style={styles.menuItem} onPress={handleLogout}>
              <Text style={styles.menuText}>Sair da Conta</Text>
            </TouchableOpacity>
          </View>
        </TouchableOpacity>
      </Modal>

      {/* Ícone de notificações com contador */}
      <TouchableOpacity onPress={onNotificationPress}>
        <View style={{ position: 'relative' }}>
          <Ionicons name="notifications-outline" size={24} color="black" />
          {notifications > 0 && (
            <View style={styles.notificationBadge}>
              <Text style={styles.notificationBadgeText}>{notifications}</Text>
            </View>
          )}
        </View>
      </TouchableOpacity>
    </View>
  );
};

export default SettingsButton;
