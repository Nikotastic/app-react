import React from "react";
import { TouchableOpacity, Text, View } from "react-native";
import { useTheme } from "../../theme/MainTask/styles";

/**
 * Barra de navegación entre categorías y calendario
 * @param {String} activeTab -Categoría activa actualmente
 * @param {Function} setActiveTab  Función para cambiar la categoría activa
 * @param {Function} setCalendarVisible  Función para mostrar/ocultar calendario
 */
const CategoryTabs = ({ activeTab, setActiveTab, setCalendarVisible }) => {
  const { styles } = useTheme();
  const categories = ["pendiente", "proceso", "terminado"];

  return (
    <View style={styles.categoryTabs}>
      {categories.map((category) => (
        <TouchableOpacity
          key={category}
          style={[
            styles.categoryTab,
            activeTab === category && styles.categoryTabActive,
          ]}
          onPress={() => {
            setActiveTab(category);
            setCalendarVisible(false);
          }}
        >
          <Text
            style={[
              styles.categoryTabText,
              activeTab === category && styles.categoryTabTextActive,
            ]}
          >
            {category.charAt(0).toUpperCase() + category.slice(1)}
          </Text>
        </TouchableOpacity>
      ))}
      
      <TouchableOpacity
        style={[
          styles.categoryTab,
          activeTab === "calendario" && styles.categoryTabActive,
        ]}
        onPress={() => {
          setActiveTab("calendario");
          setCalendarVisible(true);
        }}
      >
        <Text
          style={[
            styles.categoryTabText,
            activeTab === "calendario" && styles.categoryTabTextActive,
          ]}
        >
          Calendario
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default CategoryTabs;