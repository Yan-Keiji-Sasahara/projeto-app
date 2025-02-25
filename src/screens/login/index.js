import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, Alert } from "react-native";
import { signInWithEmailAndPassword } from 'firebase/auth';

import { auth } from "../../config/firebaseConfig";
import styles from "./style";

const Login = ({ navigation }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = () => {
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        Alert.alert("Login bem-sucedido!", `Bem-vindo, ${user.email}`);
        console.log(user);
      })
      .catch((error) => {
        const errorMessage = error.message;
        Alert.alert("Erro", errorMessage);
      });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Login</Text>
      
      <TextInput
        style={styles.input}
        placeholder="Email"
        keyboardType="email-address"
        autoCapitalize="none"
        value={email}
        onChangeText={setEmail}
      />
      
      <TextInput
        style={styles.input}
        placeholder="Senha"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
      />

      <TouchableOpacity style={styles.button} onPress={handleLogin}>
        <Text style={styles.buttonText}>Entrar</Text>
      </TouchableOpacity>
      
      <View style={styles.otherOptions}> 
        <TouchableOpacity onPress={() => navigation.navigate('CreateAccount')}>
          <Text>Criar conta</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => navigation.navigate('IForgotMyPassword')}>
          <Text>Esqueci minha senha</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Login;
