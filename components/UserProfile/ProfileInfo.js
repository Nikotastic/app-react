import React from "react";
import { View, Text, TextInput } from "react-native";
import styles from "../../theme/UserProfile/styles";

// Componente funcional que muestra y edita la información del perfil 
export default function ProfileInfo({ email, role, isEditing, onEmailChange, onRoleChange }) {
  return (
    // Contenedor principal 
    <View style={styles.profileInfo}>
      
      <Text style={styles.sectionTitle}>Información Personal</Text>

      {/* Verifica si está en modo edición para mostrar campos editables */}
      {isEditing ? (
        <>
          <Text style={styles.inputLabel}>Email:</Text>
          <TextInput
            style={styles.input}
            value={email}                   // Valor actual del email
            onChangeText={onEmailChange}   // Llama al callback cuando cambia el email
            placeholder="Email"
            keyboardType="email-address"   // Tipo de teclado adecuado para correos
          />

          <Text style={styles.inputLabel}>Rol:</Text>
          <TextInput
            style={styles.input}
            value={role}                   // Valor actual del rol
            onChangeText={onRoleChange}   // Llama al callback cuando cambia el rol
            placeholder="Rol"
          />
        </>
      ) : (
        <>
          <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>Email:</Text>
            <Text style={styles.infoValue}>{email || "No configurado"}</Text>
          </View>
          <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>Rol:</Text>
            <Text style={styles.infoValue}>{role}</Text>
          </View>
        </>
      )}
    </View>
  );
}
