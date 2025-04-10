import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
  TextInput,
  Alert,
  Image,
} from "react-native";
import Svg, { Path } from "react-native-svg";
import { auth } from "../firebaseConfig";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
const { width } = Dimensions.get("window");
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function SignInScreen({ navigation }) {
  const [isRegistering, setIsRegistering] = useState(false); // Estado para alternar entre login y registro
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false); // Estado para mostrar/ocultar contraseña
  const [showConfirmPassword, setShowConfirmPassword] = useState(false); // Estado para mostrar/ocultar confirmación de contraseña

  const handleLogin = async () => {
    if (!email || !password) {
      Alert.alert("Error", "Por favor, completa todos los campos.");
      return;
    }

    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = userCredential.user;

      await AsyncStorage.setItem("user", JSON.stringify({ email: user.email }));
      Alert.alert("Inicio de sesión exitoso", `¡Bienvenido, ${user.email}!`);
      navigation.navigate("Gestor de tareas");
    } catch (error) {
      console.error("Error al iniciar sesión:", error);
      Alert.alert("Error", "Credenciales incorrectas.");
    }
  };

  const handleRegister = async () => {
    if (!email || !password || !confirmPassword) {
      Alert.alert("Error", "Por favor, completa todos los campos.");
      return;
    }
  
    if (password !== confirmPassword) {
      Alert.alert("Error", "Las contraseñas no coinciden.");
      return;
    }
  
    try {
      await createUserWithEmailAndPassword(auth, email, password);
      Alert.alert("Registro exitoso", "¡Usuario registrado correctamente!");
      setIsRegistering(false); // Cambiar a la pantalla de inicio de sesión
    } catch (error) {
      console.error("Error al registrar usuario:", error);
      Alert.alert("Error", "No se pudo registrar el usuario.");
    }
  };

  return (
    <View style={styles.container}>
      {/* Olas arriba a la derecha */}
      <View style={[styles.topRightWave]}>
        <Svg width={width} height={200} viewBox={`0 0 ${width} 200`}>
          <Path
            d={`M${width},0 L${width},150 Q${width - 100},100 ${
              width - 200
            },140 Q${width - 300},180 ${width - 400},120 Q${width - 500},60 ${
              width - 600
            },100 L0,0 Z`}
            fill="#b3e5fc"
          />
        </Svg>
      </View>

      {/* Contenido del formulario */}
      <View style={styles.formContainer}>
        <Image source={require("../assets/logo.png")} style={styles.logo} />
        <Text style={styles.title}>{"<DevList>"}</Text>
        <Text style={styles.subtitle}>
          {isRegistering
            ? "Regístrate para comenzar"
            : "Inicia sesión para continuar"}
        </Text>

        {/* Campo de email */}
        <TextInput
          style={styles.input}
          placeholder="Correo electrónico"
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
          autoCapitalize="none"
        />

        {/* Campo de contraseña */}
        <View style={styles.passwordContainer}>
          <TextInput
            style={styles.passwordInput}
            placeholder="Contraseña"
            value={password}
            onChangeText={setPassword}
            secureTextEntry={!showPassword} // Alternar visibilidad
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

        {/* Campo de confirmación de contraseña (solo para registro) */}
        {isRegistering && (
          <View style={styles.passwordContainer}>
            <TextInput
              style={styles.passwordInput}
              placeholder="Confirmar contraseña"
              value={confirmPassword}
              onChangeText={setConfirmPassword}
              secureTextEntry={!showConfirmPassword} // Alternar visibilidad
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

        {/* Botón de acción */}
        <TouchableOpacity
          style={styles.actionButton}
          onPress={isRegistering ? handleRegister : handleLogin}
        >
          <Text style={styles.actionButtonText}>
            {isRegistering ? "Registrarse" : "Iniciar Sesión"}
          </Text>
        </TouchableOpacity>

        {/* Alternar entre login y registro */}
        <TouchableOpacity
          onPress={() => setIsRegistering(!isRegistering)}
          style={styles.switchButton}
        >
          <Text style={styles.switchButtonText}>
            {isRegistering
              ? "¿Ya tienes una cuenta? Inicia sesión"
              : "¿No tienes una cuenta? Regístrate"}
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ffffff",
    justifyContent: "center",
  },
  topRightWave: {
    position: "absolute",
    top: 0,
    right: 0,
    zIndex: 0,
    width: "100%",
    height: 200,
  },
  formContainer: {
    zIndex: 1,
    paddingHorizontal: 30,
    paddingTop: 80,
    alignItems: "center",
  },
  logo: {
    width: 100,
    height: 100,
    marginBottom: 20,
    resizeMode: "contain",
  },
  title: {
    fontSize: 36,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center",
    color: "#333",
  },
  subtitle: {
    fontSize: 16,
    color: "#555",
    marginBottom: 30,
    textAlign: "center",
  },
  input: {
    width: "100%",
    padding: 15,
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 12,
    marginBottom: 15,
    fontSize: 16,
  },
  passwordContainer: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 12,
    marginBottom: 15,
    paddingHorizontal: 10,
  },
  passwordInput: {
    flex: 1,
    paddingVertical: 12,
    fontSize: 16,
  },
  showPasswordButton: {
    paddingHorizontal: 10,
  },
  showPasswordText: {
    color: "#007bff",
    fontWeight: "bold",
  },
  actionButton: {
    backgroundColor: "#4285F4",
    padding: 15,
    borderRadius: 12,
    alignItems: "center",
    width: "100%",
  },
  actionButtonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },
  switchButton: {
    marginTop: 20,
  },
  switchButtonText: {
    color: "#4285F4",
    fontSize: 14,
    textDecorationLine: "underline",
  },
});