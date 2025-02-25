import React, { useLayoutEffect, useState, useEffect } from 'react';
import { View, Text, FlatList, TouchableOpacity, Image } from 'react-native';
import { getFirestore, collection, onSnapshot, query, where, getDocs } from 'firebase/firestore';
import styles from './style';
import NotificationModal from './notificationModal';
import AddContactModal from './addContactModal';
import SettingsButton from './settingsButton';

const db = getFirestore();

const Contacts = ({ navigation, user }) => {
  const [contacts, setContacts] = useState([]);
  const [notifications, setNotifications] = useState(0);
  const [showNotificationModal, setShowNotificationModal] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);

  useEffect(() => {
    const unsubscribe = onSnapshot(collection(db, 'users', 'a@gmail.com', 'contacts'), (snapshot) => {
      setContacts(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
    });
    return () => unsubscribe();
  }, []);

  useEffect(() => {
    const getNotifications = async () => {
      try {
        const q = query(collection(db, 'notifications'), where('read', '==', false));
        const querySnapshot = await getDocs(q);
        setNotifications(querySnapshot.size);
      } catch (error) {
        console.error('Erro ao buscar notificações: ', error);
      }
    };
    getNotifications();
  }, []);

  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <SettingsButton 
          navigation={navigation} 
          notifications={notifications} 
          onNotificationPress={() => setShowNotificationModal(true)}
        />
      ),
    });
  }, [navigation, notifications]);

  const renderItem = ({ item }) => (
    <TouchableOpacity
      style={styles.contactItem}
      onPress={() => navigation.navigate('Chat', { contact: item })}
      onLongPress={() => navigation.navigate('ContactProfile', { contact: item })}
    >
      <Image source={{ uri: 'https://placekitten.com/50/50' }} style={styles.contactImage} />
      <View style={styles.contactInfo}>
        <Text style={styles.contactName}>{item.name}</Text>
        <Text style={styles.contactStatus}>{item.status}</Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <FlatList data={contacts} renderItem={renderItem} keyExtractor={(item) => item.id} />
      <TouchableOpacity style={styles.buttonBase} onPress={() => setModalVisible(true)}>
        <Text style={styles.buttonText}>Adicionar Contato</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.buttonBase} onPress={() => navigation.navigate('MyCatalog')}>
        <Text style={styles.buttonText}>Meu catálogo</Text>
      </TouchableOpacity>
      <AddContactModal visible={modalVisible} onClose={() => setModalVisible(false)} />
      <NotificationModal visible={showNotificationModal} onClose={() => setShowNotificationModal(false)} userId={user?.uid} />
    </View>
  );
};

export default Contacts;
