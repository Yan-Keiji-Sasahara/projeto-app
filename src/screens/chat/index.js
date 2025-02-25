import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, FlatList } from 'react-native';
import { useNavigation } from '@react-navigation/native';

import styles from './style';

const Chat = ({ route }) => {
  const { contact } = route.params;
  const navigation = useNavigation();
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');

  const sendMessage = () => {
    if (input.trim()) {
      setMessages([...messages, { id: messages.length.toString(), text: input }]);
      setInput('');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.contactName}>{contact.name}</Text>

      <FlatList
        data={messages}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => <Text style={styles.message}>{item.text}</Text>}
      />

      <View style={styles.inputContainer}>
        {/* ✅ Botão do catálogo no canto inferior esquerdo */}
        <TouchableOpacity onPress={() => navigation.navigate('Catalog')} style={styles.catalogButton}>
          <Text style={styles.catalogText}>📦</Text>
        </TouchableOpacity>

        {/* Caixa de texto */}
        <TextInput
          style={styles.input}
          value={input}
          onChangeText={setInput}
          placeholder="Digite uma mensagem..."
        />

        {/* Botão de envio */}
        <TouchableOpacity onPress={sendMessage} style={styles.sendButton}>
          <Text style={styles.sendText}>Enviar</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Chat;
