import React, { useEffect, useRef } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import LottieView from 'lottie-react-native';
import * as SplashScreen from 'expo-splash-screen'; 

export default function SplashScreenComponent({ onFinish }) {
  const animationRef = useRef(null);

  useEffect(() => {
    // ✅ Oculta el splash nativo de Expo
    SplashScreen.hideAsync();

    // Espera 7 segundos y luego llama a onFinish
    const timer = setTimeout(() => {
      animationRef.current?.pause(); // Opcional: pausar la animación
      onFinish(); // Ir a la siguiente pantalla
    }, 7000);

    return () => clearTimeout(timer); // Limpia el temporizador
  }, []);

  return (
    <View style={styles.splashContainer}>
      <LottieView
        ref={animationRef}
        source={require('../assets/animacion.json')}
        style={styles.lottieAnimation}
        autoPlay
        loop={true}
      />
      <Text style={styles.splashText}>{"<DevList>"}</Text>
      <Text style={styles.splashSubtext}>Gestor de Tareas para Programadores</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  splashContainer: {
    flex: 1,
    backgroundColor: '#F5F7FB',
    alignItems: 'center',
    justifyContent: 'center',
  },
  lottieAnimation: {
    width: 200,
    height: 200,
  },
  splashText: {
    fontSize: 32,
    fontWeight: 'bold',
    marginTop: 20,
    color: '#333',
  },
  splashSubtext: {
    fontSize: 16,
    color: '#666',
    marginTop: 8,
  },
});
