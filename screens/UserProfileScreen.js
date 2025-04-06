import React, { useState, useEffect } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  TextInput, 
  TouchableOpacity, 
  Image, 
  ScrollView,
  Alert
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as ImagePicker from 'expo-image-picker';

export default function UserProfileScreen({ navigation }) {
  const [user, setUser] = useState({
    name: '',
    email: '',
    role: 'Desarrollador',
    avatar: 'https://st3.depositphotos.com/1007566/13175/v/450/depositphotos_131750410-stock-illustration-woman-female-avatar-character.jpg'
  });
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    loadUserData();
  }, []);

  useEffect(() => {
    const updateNavigationAvatar = () => {
      navigation.setOptions({
        headerRight: () => (
          <Image 
            source={{ uri: user.avatar }} 
            style={{ width: 40, height: 40, borderRadius: 20, marginRight: 10 }}
          />
        )
      });
    };
    updateNavigationAvatar();
  }, [user.avatar, navigation]);

  const loadUserData = async () => {
    try {
      const userData = await AsyncStorage.getItem('user');
      if (userData) {
        setUser(JSON.parse(userData));
      }
    } catch (error) {
      console.error('Error loading user data:', error);
    }
  };

  const saveUserData = async () => {
    try {
      await AsyncStorage.setItem('user', JSON.stringify(user));
      setIsEditing(false);
      Alert.alert('Éxito', 'Perfil actualizado correctamente');
    } catch (error) {
      console.error('Error saving user data:', error);
      Alert.alert('Error', 'No se pudo guardar la información');
    }
  };

  const pickImage = async () => {
    // Solicita permisos para acceder a la galería
    const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();
  
    if (!permissionResult.granted) {
      Alert.alert('Permiso denegado', 'Se necesita acceso a la galería para seleccionar una imagen.');
      return;
    }
  
    // Abre la galería para seleccionar una imagen
    let result = await ImagePicker.launchImageLibraryAsync({
      allowsEditing: true,
      aspect: [1, 1], // Relación de aspecto 1:1 para imágenes cuadradas
      quality: 1, // Calidad máxima
    });
  
    if (!result.canceled) {
      const newAvatar = result.assets[0].uri;
  
      // Actualiza el estado del usuario
      setUser({ ...user, avatar: newAvatar });
  
      // Guarda el avatar en AsyncStorage
      try {
        await AsyncStorage.setItem('userAvatar', newAvatar);
      } catch (error) {
        console.error('Error al guardar el avatar:', error);
      }
    }
  };
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity 
          style={styles.backButton}
          onPress={() => navigation.goBack()}
        >
          <Text style={styles.backButtonText}>← Volver</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Perfil de Usuario</Text>
      </View>

      <ScrollView style={styles.content}>
        <View style={styles.profileHeader}>
          <TouchableOpacity onPress={pickImage}>
            <Image 
              source={{ uri: user.avatar }}
              style={styles.avatar}
            />
          </TouchableOpacity>
          {!isEditing ? (
            <Text style={styles.username}>{user.name || 'Usuario'}</Text>
          ) : (
            <TextInput
              style={styles.input}
              value={user.name}
              onChangeText={(text) => setUser({...user, name: text})}
              placeholder="Nombre"
            />
          )}
        </View>

        <View style={styles.profileInfo}>
          <Text style={styles.sectionTitle}>Información Personal</Text>
          
          {isEditing ? (
            <>
              <Text style={styles.inputLabel}>Email:</Text>
              <TextInput
                style={styles.input}
                value={user.email}
                onChangeText={(text) => setUser({...user, email: text})}
                placeholder="Email"
                keyboardType="email-address"
              />
              
              <Text style={styles.inputLabel}>Rol:</Text>
              <TextInput
                style={styles.input}
                value={user.role}
                onChangeText={(text) => setUser({...user, role: text})}
                placeholder="Rol"
              />
            </>
          ) : (
            <>
              <View style={styles.infoRow}>
                <Text style={styles.infoLabel}>Email:</Text>
                <Text style={styles.infoValue}>{user.email || 'No configurado'}</Text>
              </View>
              <View style={styles.infoRow}>
                <Text style={styles.infoLabel}>Rol:</Text>
                <Text style={styles.infoValue}>{user.role}</Text>
              </View>
            </>
          )}
        </View>
        
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
      </ScrollView>
    </View>
  );
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F7FB',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingTop: 50,
    paddingHorizontal: 20,
    paddingBottom: 20,
    backgroundColor: '#FFF',
    borderBottomWidth: 1,
    borderBottomColor: '#EEE',
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
    flex: 1,
    textAlign: 'center',
    marginRight: 40,
  },
  backButton: {
    padding: 5,
  },
  backButtonText: {
    fontSize: 16,
    color: '#007bff',
  },
  content: {
    flex: 1,
    padding: 20,
  },
  profileHeader: {
    alignItems: 'center',
    marginBottom: 30,
  },
  avatar: {
    width: 120,
    height: 120,
    borderRadius: 60,
    marginBottom: 15,
    borderWidth: 3,
    borderColor: '#007bff',
  },
  username: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
  },
  profileInfo: {
    backgroundColor: '#FFF',
    borderRadius: 12,
    padding: 20,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 15,
    color: '#333',
  },
  infoRow: {
    flexDirection: 'row',
    marginBottom: 10,
    paddingBottom: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#F0F0F0',
  },
  infoLabel: {
    flex: 1,
    fontSize: 16,
    color: '#666',
  },
  infoValue: {
    flex: 2,
    fontSize: 16,
    color: '#333',
  },
  inputLabel: {
    fontSize: 16,
    marginBottom: 5,
    color: '#666',
  },
  input: {
    borderWidth: 1,
    borderColor: '#DDD',
    borderRadius: 8,
    padding: 12,
    marginBottom: 15,
    fontSize: 16,
    backgroundColor: '#FAFAFA',
  },
  buttonContainer: {
    marginTop: 10,
    marginBottom: 30,
  },
  button: {
    borderRadius: 8,
    padding: 15,
    alignItems: 'center',
    marginBottom: 10,
  },
  editButton: {
    backgroundColor: '#007bff',
  },
  saveButton: {
    backgroundColor: '#28a745',
  },
  cancelButton: {
    backgroundColor: '#6c757d',
  },
  buttonText: {
    color: '#FFF',
    fontWeight: '600',
    fontSize: 16,
  },
});