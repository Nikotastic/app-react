import React, { useEffect } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
  Animated,
  Image,
  Alert,
} from "react-native";
import Svg, { Path } from "react-native-svg";
import { AntDesign } from "@expo/vector-icons";
import * as Google from "expo-auth-session/providers/google";
import { auth } from "../firebaseConfig"; 
import { GoogleAuthProvider, signInWithCredential } from "firebase/auth";
import * as AuthSession from "expo-auth-session";

const { width } = Dimensions.get("window");

export default function SignInScreen({ navigation }) {
  const redirectUri = AuthSession.makeRedirectUri({
    useProxy: true,
  });
  console.log(" Redirect URI:", redirectUri); 

  const [request, response, promptAsync] = Google.useAuthRequest({
    expoClientId:
      "755391250795-il0scie5e3894d7a2l7rfpu92avvcu4n.apps.googleusercontent.com",
    androidClientId: '755391250795-0bl18ojbej0dk2kcu46045g2vvk34vli.apps.googleusercontent.com',
    redirectUri,
  });

  useEffect(() => {
    const uri = AuthSession.makeRedirectUri({ useProxy: true });

    if (response?.type === "success") {
      const { id_token } = response.params;
      const credential = GoogleAuthProvider.credential(id_token);

      signInWithCredential(auth, credential)
        .then(() => {
          Alert.alert("Inicio de sesión exitoso", "¡Bienvenido!");
          navigation.navigate("Gestor de tareas"); // Navegar a la pantalla principal
        })
        .catch((error) => {
          Alert.alert("Error al iniciar sesión", error.message);
        });
    }
  }, [response]);

  return (
    <View style={styles.container}>
      {/* Olas arriba a la derecha */}
      <Animated.View style={[styles.topRightWave]}>
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
      </Animated.View>

      {/* Contenido de inicio de sesión */}
      <View style={styles.formContainer}>
        <Image source={require("../assets/logo.png")} style={styles.logo} />
        <Text style={styles.title}>{"<DevList>"}</Text>
        <Text style={styles.subtitle}>Sign in with Google to continue</Text>

        <TouchableOpacity
          style={styles.googleButton}
          onPress={() => promptAsync()}
          disabled={!request}
        >
          <AntDesign name="google" size={24} color="white" />
          <Text style={styles.googleButtonText}>Sign In with Google</Text>
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
  googleButton: {
    flexDirection: "row",
    backgroundColor: "#4285F4",
    padding: 15,
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
  },
  googleButtonText: {
    color: "white",
    fontSize: 16,
    marginLeft: 10,
  },
});
