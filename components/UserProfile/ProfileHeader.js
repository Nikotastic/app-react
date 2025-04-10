import React from "react";
import { View, Text, Image, TextInput, TouchableOpacity } from "react-native";

// Importación de los estilos
import styles from "../../theme/UserProfile/styles.js";

// Componente funcional que representa el encabezado del perfil de usuario
export default function ProfileHeader({ avatar, name, isEditing, onNameChange, onPickImage }) {
  return (
    // Contenedor principal 
    <View style={styles.profileHeader}>

      {/* Imagen del avatar con funcionalidad táctil para cambiarla */}
      <TouchableOpacity onPress={onPickImage}>
        <Image source={{ uri: avatar }} style={styles.avatar} />
      </TouchableOpacity>

      
      {!isEditing ? (
        <Text style={styles.username}>{name || "Usuario"}</Text>
      ) : (
        <TextInput
          style={styles.input}
          value={name}
          onChangeText={onNameChange} 
          placeholder="Nombre"
        />
      )}
    </View>
  );
}
