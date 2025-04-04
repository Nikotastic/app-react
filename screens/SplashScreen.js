import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Animated } from 'react-native';
import LottieView from 'lottie-react-native'; // Importa la librería para animaciones 

export default function SplashScreen({ onFinish }) {
  const [animationProgress] = useState(new Animated.Value(0));

  // useEffect se ejecuta cuando el componente se monta
  useEffect(() => {
    // Inicia la animación con Animated.timing
    Animated.timing(animationProgress, {
      toValue: 5, // La animación avanza de 0 a 1
      duration: 3000, // Dura 3 segundos
      useNativeDriver: true, // Optimización para mejorar rendimiento
    }).start(() => {
      // Cuando la animación finaliza, se llama a la función onFinish()
      onFinish();
    });
  }, []);

  return (
    <View style={styles.splashContainer}>
      <LottieView
        source={require('../assets/animacion.json')} // Carga el archivo de animación
        style={styles.lottieAnimation} // Aplica los estilos
        autoPlay // Reproduce la animación automáticamente
        loop={true} 
        onAnimationFinish={onFinish} // Cuando termina la animación, llama a onFinish()
      />
      {/* Título de la aplicación */}
      <Text style={styles.splashText}>{"<DevList>"}</Text>
      <Text style={styles.splashSubtext}>Gestor de Tareas para Programadores</Text>
    </View>
  );
}

// Estilos 
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

