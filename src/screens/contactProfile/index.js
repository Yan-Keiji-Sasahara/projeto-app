import React from 'react';
import { View, Text, Image } from 'react-native';
import styles from './style'

const ContactProfile = ({ route }) => {
  const { contact } = route.params;

  return (
    <View style={styles.container}>
      <Image source={{ uri: 'https://placekitten.com/200/200' }} style={styles.profileImage} />
      <Text style={styles.name}>{contact.name}</Text>
      <Text style={styles.status}>{contact.status}</Text>
    </View>
  );
};

export default ContactProfile;
