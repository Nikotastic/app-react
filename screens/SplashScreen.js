import React, { useEffect, useRef } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import LottieView from 'lottie-react-native'; // Para reproducir animaciones .json tipo Lottie
import * as SplashScreen from 'expo-splash-screen'; // Para controlar el splash nativo de Expo

//callback para navegar luego del splash
export default function SplashScreenComponent({ onFinish }) {
  const animationRef = useRef(null); 

  useEffect(() => {
    // Oculta el splash screen nativo de Expo 
    SplashScreen.hideAsync();

    // Inicia un temporizador para que después de 7 segundos se ejecute onFinish()
    const timer = setTimeout(() => {
      animationRef.current?.pause(); 
      onFinish(); // Llama a la función pasada por props para ir a la siguiente pantalla
    }, 7000); // 7 segundos

    // Limpieza del temporizador si el componente se desmonta antes de terminar
    return () => clearTimeout(timer);
  }, []);

  return (
    <View style={styles.splashContainer}>
      {/* Animación de Lottie que se reproduce automáticamente en bucle */}
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
