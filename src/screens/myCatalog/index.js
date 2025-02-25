import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Image, TextInput, FlatList } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import styles from './style';

const MyCatalog = () => {
  const [items, setItems] = useState([]);

  const addImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      setItems([...items, { id: items.length.toString(), uri: result.assets[0].uri, title: '' }]);
    }
  };

  const updateTitle = (id, newTitle) => {
    setItems(items.map(item => item.id === id ? { ...item, title: newTitle } : item));
  };

  const renderItem = ({ item }) => (
    <View style={styles.itemContainer}>
      <Image source={{ uri: item.uri }} style={styles.image} />
      <TextInput
        style={styles.titleInput}
        placeholder="Título"
        value={item.title}
        onChangeText={(text) => updateTitle(item.id, text)}
      />
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Meu Catálogo</Text>

      {/* FlatList em 3 colunas */}
      <FlatList
        data={items}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        numColumns={3} // Define 3 imagens por linha
        contentContainerStyle={styles.listContainer}
      />

      {/* Botão fixo no final da tela */}
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.addButton} onPress={addImage}>
          <Text style={styles.addButtonText}>Adicionar Imagem</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default MyCatalog;
