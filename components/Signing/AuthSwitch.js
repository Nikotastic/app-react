import React from "react";
import { Text, TouchableOpacity } from "react-native";
import styles from "../../theme/Auth/styles";

export default function AuthSwitch({ isRegistering, setIsRegistering }) {
  return (
    <TouchableOpacity
      onPress={() => setIsRegistering(!isRegistering)} // alternar modo
      style={styles.switchButton}
    >
      <Text style={styles.switchButtonText}>
        {isRegistering
          ? "¿Ya tienes una cuenta? Inicia sesión"
          : "¿No tienes una cuenta? Regístrate"}
      </Text>
    </TouchableOpacity>
  );
}
