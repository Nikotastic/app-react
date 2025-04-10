import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  Image,
  Alert,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as ImagePicker from "expo-image-picker";
import styles from "../theme/UserProfile/styles";
import ProfileHeader from "../components/UserProfile/ProfileHeader";
import ProfileInfo from "../components/UserProfile/ProfileInfo";

// Componente principal de la pantalla de perfil
export default function UserProfileScreen({ navigation }) {

  // Estado local del usuario
  const [user, setUser] = useState({
    name: "",
    email: "",
    role: "Desarrollador",
  });

  const [isEditing, setIsEditing] = useState(false);

  // Al montar el componente, carga los datos guardados del usuario
  useEffect(() => {
    loadUserData();
  }, []);

  // Cada vez que cambia el avatar se actualiza el avatar
  useEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <Image
          source={{ uri: user.avatar }}
          style={{ width: 40, height: 40, borderRadius: 20, marginRight: 10 }}
        />
      ),
    });
  }, [user.avatar, navigation]);

  // Función que carga los datos del usuario desde AsyncStorage
  const loadUserData = async () => {
    try {
      const userData = await AsyncStorage.getItem("user");
      const userAvatar = await AsyncStorage.getItem("userAvatar");

      if (userData) {
        const parsedUser = JSON.parse(userData);
        // Combina los datos cargados con el avatar 
        setUser({ ...parsedUser, avatar: userAvatar || parsedUser.avatar });
      } else if (userAvatar) {
        // Si solo hay avatar, lo agrega al estado
        setUser((prevUser) => ({ ...prevUser, avatar: userAvatar }));
      }
    } catch (error) {
      console.error("Error loading user data:", error);
    }
  };

  // Función para guardar los datos editados del usuario
  const saveUserData = async () => {
    try {
      await AsyncStorage.setItem("user", JSON.stringify(user)); // Guarda usuario
      if (user.avatar) {
        await AsyncStorage.setItem("userAvatar", user.avatar); // Guarda avatar si hay
      }
      Alert.alert("Éxito", "Los datos del usuario se han guardado correctamente.");
      setIsEditing(false); 
    } catch (error) {
      console.error("Error al guardar los datos del usuario:", error);
      Alert.alert("Error", "Hubo un problema al guardar los datos del usuario.");
    }
  };

  // Función para seleccionar una nueva imagen de perfil
  const pickImage = async () => {
    const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (!permissionResult.granted) {
      Alert.alert("Permiso denegado", "Se necesita acceso a la galería para seleccionar una imagen.");
      return;
    }

    // Abre la galería para seleccionar una imagen
    let result = await ImagePicker.launchImageLibraryAsync({
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });

    // Si el usuario seleccionó una imagen, se actualiza el avatar
    if (!result.canceled) {
      const newAvatar = result.assets[0].uri;
      setUser({ ...user, avatar: newAvatar });

      try {
        // Guarda avatar y usuario con el nuevo avatar
        await AsyncStorage.setItem("userAvatar", newAvatar);
        await AsyncStorage.setItem("user", JSON.stringify({ ...user, avatar: newAvatar }));
      } catch (error) {
        console.error("Error al guardar el avatar:", error);
      }
    }
  };

  return (
    <View style={styles.container}>
      
      {/* Header superior con botón de regreso */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
          <Text style={styles.backButtonText}>← Volver</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Perfil de Usuario</Text>
      </View>

      {/* Contenedor desplazable con toda la información */}
      <ScrollView style={styles.content}>

        {/* El avatar y el nombre */}
        <ProfileHeader
          avatar={user.avatar}
          name={user.name}
          isEditing={isEditing}
          onPickImage={pickImage}
          onNameChange={(text) => setUser({ ...user, name: text })}
        />

        {/* Información del perfil*/}
        <ProfileInfo
          email={user.email}
          role={user.role}
          isEditing={isEditing}
          onEmailChange={(text) => setUser({ ...user, email: text })}
          onRoleChange={(text) => setUser({ ...user, role: text })}
        />

        {/* Botones de guardar/cancelar o editar */}
        <View style={styles.buttonContainer}>
          {isEditing ? (
            <>
              <TouchableOpacity
                style={[styles.button, styles.saveButton]}
                onPress={saveUserData}
              >
                <Text style={styles.buttonText}>Guardar Cambios</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.button, styles.cancelButton]}
                onPress={() => {
                  loadUserData(); 
                  setIsEditing(false);
                }}
              >
                <Text style={styles.buttonText}>Cancelar</Text>
              </TouchableOpacity>
            </>
          ) : (
            <TouchableOpacity
              style={[styles.button, styles.editButton]}
              onPress={() => setIsEditing(true)}
            >
              <Text style={styles.buttonText}>Editar Perfil</Text>
            </TouchableOpacity>
          )}
        </View>

        {/* Botón para cerrar sesión */}
        <TouchableOpacity
          style={[styles.button, styles.close]}
          onPress={() => navigation.navigate("SignIn")}
        >
          <Text style={styles.buttonText}>Cerrar Sesión</Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
}
