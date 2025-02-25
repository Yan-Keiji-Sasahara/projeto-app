import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, Alert } from "react-native";
import { sendPasswordResetEmail } from "firebase/auth";

import { auth } from "../../config/firebaseConfig";
import styles from "./style";

const IForgotMyPassword = ({ navigation }) => {
  const [email, setEmail] = useState("");

  const handleIForgotMyPassword = () => {
    if (!email) {
      Alert.alert("Erro", "Por favor, insira seu e-mail.");
      return;
    }

    sendPasswordResetEmail(auth, email)
      .then(() => {
        Alert.alert(
          "E-mail enviado",
          "Confira sua caixa de entrada para redefinir sua senha."
        );
        navigation.navigate("Login"); 
      })
      .catch((error) => {
        const errorMessage = error.message;
        Alert.alert("Erro", errorMessage); 
      });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Esqueci minha senha</Text>

      <TextInput
        style={styles.input}
        placeholder="Digite seu e-mail"
        keyboardType="email-address"
        autoCapitalize="none"
        value={email}
        onChangeText={setEmail} 
      />

      <TouchableOpacity style={styles.button} onPress={handleIForgotMyPassword}>
        <Text style={styles.buttonText}>Redefinir senha</Text>
      </TouchableOpacity>
    </View>
  );
};

export default IForgotMyPassword;
