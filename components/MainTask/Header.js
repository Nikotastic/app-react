import React from "react";
import { View, Text, TouchableOpacity, Image } from "react-native";
import { useTheme } from "../../theme/MainTask/styles";

/**
 * Encabezado de la pantalla con título, botón de añadir y avatar
 * @param {Function} navigation  Objeto de navegación
 * @param {Function} setModalVisible Función para mostrar modal de nueva tarea
 * @param {String} avatar  URI del avatar del usuario
 */
const Header = ({ navigation, setModalVisible, avatar }) => {
  const { styles } = useTheme();

  return (
    <View style={styles.header}>
      <Text style={styles.headerTitle}>{"<DevList>"}</Text>

      <View style={styles.headerActions}>
        <TouchableOpacity
          style={styles.addButton}
          onPress={() => {
            setModalVisible(true);
          }}
        >
          <Text style={styles.addButtonText}>+ Añadir</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.profileButton}
          onPress={() => navigation.navigate("Profile")}
        >
          <Image
            source={{ uri: avatar || "https://via.placeholder.com/150" }}
            style={styles.profileIcon}
          />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Header;