import React, { useState } from "react";
import { View } from "react-native";
import SvgWave from "../components/Signing/SvgWave";
import AuthHeader from "../components/Signing/AuthHeader";
import AuthForm from "../components/Signing/AuthForm";
import AuthSwitch from "../components/Signing/AuthSwitch";
import styles from "../theme/Auth/styles";

export default function SignInScreen({ navigation }) {

  // Estados del formulario
  const [isRegistering, setIsRegistering] = useState(false); // alterna entre login/registro
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false); // mostrar/ocultar contraseña
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  return (
    <View style={styles.container}>
      {/* Fondo superior con curva SVG */}
      <SvgWave />

      {/* Contenedor del formulario */}
      <View style={styles.formContainer}>
        {/* Logo, título y subtítulo */}
        <AuthHeader isRegistering={isRegistering} />

        {/* Inputs y botón de acción */}
        <AuthForm
          isRegistering={isRegistering}
          email={email}
          password={password}
          confirmPassword={confirmPassword}
          showPassword={showPassword}
          showConfirmPassword={showConfirmPassword}
          setEmail={setEmail}
          setPassword={setPassword}
          setConfirmPassword={setConfirmPassword}
          setShowPassword={setShowPassword}
          setShowConfirmPassword={setShowConfirmPassword}
          navigation={navigation}
          setIsRegistering={setIsRegistering}
        />

        {/* Botón para cambiar entre login/registro */}
        <AuthSwitch
          isRegistering={isRegistering}
          setIsRegistering={setIsRegistering}
        />
      </View>
    </View>
  );
}
