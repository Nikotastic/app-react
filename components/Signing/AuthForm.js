import React from "react";
import {
  TextInput,
  TouchableOpacity,
  Text,
  View,
  Alert,
} from "react-native";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { auth } from "../../firebaseConfig";
import AsyncStorage from "@react-native-async-storage/async-storage";
import styles from "../../theme/Auth/styles";

export default function AuthForm({
  isRegistering,
  email,
  password,
  confirmPassword,
  showPassword,
  showConfirmPassword,
  setEmail,
  setPassword,
  setConfirmPassword,
  setShowPassword,
  setShowConfirmPassword,
  navigation,
  setIsRegistering,
}) {
  // Función para iniciar sesión
  const handleLogin = async () => {
    if (!email || !password) {
      return Alert.alert("Error", "Por favor, completa todos los campos.");
    }

    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      // Guarda el usuario localmente
      await AsyncStorage.setItem("user", JSON.stringify({ email: user.email }));

      Alert.alert("Inicio de sesión exitoso", `¡Bienvenido, ${user.email}!`);
      navigation.navigate("Gestor de tareas");
    } catch {
      Alert.alert("Error", "Credenciales incorrectas.");
    }
  };

  // Función para registrar un nuevo usuario
  const handleRegister = async () => {
    if (!email || !password || !confirmPassword) {
      return Alert.alert("Error", "Por favor, completa todos los campos.");
    }

    if (password !== confirmPassword) {
      return Alert.alert("Error", "Las contraseñas no coinciden.");
    }

    try {
      await createUserWithEmailAndPassword(auth, email, password);
      Alert.alert("Registro exitoso", "¡Usuario registrado correctamente!");
      setIsRegistering(false); // Cambia a pantalla de login
    } catch {
      Alert.alert("Error", "No se pudo registrar el usuario.");
    }
  };

  return (
    <>
      {/* Campo de email */}
      <TextInput
        style={styles.input}
        placeholder="Correo electrónico"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        autoCapitalize="none"
      />

      {/* Campo de contraseña con botón para mostrar/ocultar */}
      <View style={styles.passwordContainer}>
        <TextInput
          style={styles.passwordInput}
          placeholder="Contraseña"
          value={password}
          onChangeText={setPassword}
          secureTextEntry={!showPassword}
        />
        <TouchableOpacity
          style={styles.showPasswordButton}
          onPress={() => setShowPassword(!showPassword)}
        >
          <Text style={styles.showPasswordText}>
            {showPassword ? "Ocultar" : "Ver"}
          </Text>
        </TouchableOpacity>
      </View>

      {/* Campo para confirmar contraseña si está en modo registro */}
      {isRegistering && (
        <View style={styles.passwordContainer}>
          <TextInput
            style={styles.passwordInput}
            placeholder="Confirmar contraseña"
            value={confirmPassword}
            onChangeText={setConfirmPassword}
            secureTextEntry={!showConfirmPassword}
          />
          <TouchableOpacity
            style={styles.showPasswordButton}
            onPress={() => setShowConfirmPassword(!showConfirmPassword)}
          >
            <Text style={styles.showPasswordText}>
              {showConfirmPassword ? "Ocultar" : "Ver"}
            </Text>
          </TouchableOpacity>
        </View>
      )}

      {/* Botón de acción: login o registro */}
      <TouchableOpacity
        style={styles.actionButton}
        onPress={isRegistering ? handleRegister : handleLogin}
      >
        <Text style={styles.actionButtonText}>
          {isRegistering ? "Registrarse" : "Iniciar Sesión"}
        </Text>
      </TouchableOpacity>
    </>
  );
}
