import React from "react";
import { Image, Text } from "react-native";
import styles from "../../theme/Auth/styles";

export default function AuthHeader({ isRegistering }) {
  return (
    <>
      {/* Logo de la app */}
      <Image source={require("../../assets/logo.png")} style={styles.logo} />

      {/* Título principal */}
      <Text style={styles.title}>{"<DevList>"}</Text>

      {/* Subtítulo que cambia según el modo */}
      <Text style={styles.subtitle}>
        {isRegistering
          ? "Regístrate para comenzar"
          : "Inicia sesión para continuar"}
      </Text>
    </>
  );
}
